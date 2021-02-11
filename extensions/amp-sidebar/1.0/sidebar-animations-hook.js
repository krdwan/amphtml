/**
 * Copyright 2021 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Side} from './sidebar-config';
import {assertDoesNotContainDisplay, setStyles} from '../../../src/style';
import {useLayoutEffect, useRef, useValueRef} from '../../../src/preact';

const ANIMATION_DURATION = 350;
const ANIMATION_EASE_IN = 'cubic-bezier(0,0,.21,1)';

const ANIMATION_KEYFRAMES_FADE_IN = [{'opacity': '0'}, {'opacity': '1'}];
const ANIMATION_KEYFRAMES_SLIDE_IN_LEFT = [
  {'transform': 'translateX(-100%)'},
  {'transform': 'translateX(0)'},
];
const ANIMATION_KEYFRAMES_SLIDE_IN_RIGHT = [
  {'transform': 'translateX(100%)'},
  {'transform': 'translateX(0)'},
];

const ANIMATION_STYLES_SIDEBAR_LEFT_INIT = {'transform': 'translateX(-100%)'};
const ANIMATION_STYLES_SIDEBAR_RIGHT_INIT = {'transform': 'translateX(100%)'};
const ANIMATION_STYLES_BACKDROP_INIT = {'opacity': '0'};
const ANIMATION_STYLES_SIDEBAR_FINAL = {'transform': ''};
const ANIMATION_STYLES_BACKDROP_FINAL = {'opacity': ''};

/** @private @enum {number} */
const AnimationState = {
  OPENING: 0,
  CLOSING: 1,
  NOT_ANIMATING: 2,
};

/**
 * @param {!Element} element
 * @param {!Object<string, *>} styles
 */
function safelySetStyles(element, styles) {
  setStyles(element, assertDoesNotContainDisplay(styles));
}

/**
 * @param {boolean} opened
 * @param {{current: function|undefined}} onAfterClose
 * @param {{current: string}} sideRef
 * @param {{current: Element|null}} sidebarRef
 * @param {{current: Element|null}} backdropRef
 * @param {function} setMounted
 */
export function useSidebarAnimation(
  opened,
  onAfterClose,
  sideRef,
  sidebarRef,
  backdropRef,
  setMounted
) {
  const onAfterCloseRef = useValueRef(onAfterClose);
  const sidebarAnimationRef = useRef(null);
  const backdropAnimationRef = useRef(null);
  const animationDirectionRef = useRef(AnimationState.NOT_ANIMATING);
  useLayoutEffect(() => {
    const sidebarElement = sidebarRef.current;
    const backdropElement = backdropRef.current;
    if (!sidebarElement || !backdropElement || !sideRef.current) {
      return;
    }

    const postVisibleAnim = () => {
      safelySetStyles(sidebarElement, ANIMATION_STYLES_SIDEBAR_FINAL);
      safelySetStyles(backdropElement, ANIMATION_STYLES_BACKDROP_FINAL);
      sidebarAnimationRef.current = null;
      backdropAnimationRef.current = null;
      animationDirectionRef.current = AnimationState.NOT_ANIMATING;
    };
    const postInvisibleAnim = () => {
      if (onAfterCloseRef.current) {
        onAfterCloseRef.current();
      }
      sidebarAnimationRef.current = null;
      backdropAnimationRef.current = null;
      animationDirectionRef.current = AnimationState.NOT_ANIMATING;
      setMounted(false);
    };

    // currently animating
    if (animationDirectionRef.current !== AnimationState.NOT_ANIMATING) {
      if (
        (opened && animationDirectionRef.current === AnimationState.CLOSING) ||
        (!opened && animationDirectionRef.current === AnimationState.OPENING)
      ) {
        // reverse the current animation
        const sidebarAnimation = sidebarAnimationRef.current;
        if (sidebarAnimation) {
          sidebarAnimation.reverse();
          sidebarAnimation.onfinish = opened
            ? postVisibleAnim
            : postInvisibleAnim;
        }
        const backdropAnimation = backdropAnimationRef.current;
        if (backdropAnimation) {
          backdropAnimation.reverse();
        }
        animationDirectionRef.current = opened
          ? AnimationState.OPENING
          : AnimationState.CLOSING;
      }
      return;
    }

    // currently in fully opened or closed state
    if (opened) {
      // make visible animation
      if (!sidebarElement.animate || !backdropElement.animate) {
        postVisibleAnim();
        return;
      }
      safelySetStyles(
        sidebarElement,
        sideRef.current === Side.LEFT
          ? ANIMATION_STYLES_SIDEBAR_LEFT_INIT
          : ANIMATION_STYLES_SIDEBAR_RIGHT_INIT
      );
      safelySetStyles(backdropElement, ANIMATION_STYLES_BACKDROP_INIT);
      const sidebarAnimation = sidebarElement.animate(
        sideRef.current === Side.LEFT
          ? ANIMATION_KEYFRAMES_SLIDE_IN_LEFT
          : ANIMATION_KEYFRAMES_SLIDE_IN_RIGHT,
        {
          duration: ANIMATION_DURATION,
          fill: 'both',
          easing: ANIMATION_EASE_IN,
        }
      );
      sidebarAnimation.onfinish = postVisibleAnim;
      const backdropAnimation = backdropElement.animate(
        ANIMATION_KEYFRAMES_FADE_IN,
        {
          duration: ANIMATION_DURATION,
          fill: 'both',
          easing: ANIMATION_EASE_IN,
        }
      );
      sidebarAnimationRef.current = sidebarAnimation;
      backdropAnimationRef.current = backdropAnimation;
      animationDirectionRef.current = AnimationState.OPENING;
    } else {
      // make invisible animation
      if (!sidebarElement.animate || !backdropElement.animate) {
        postInvisibleAnim();
        return;
      }
      const sidebarAnimation = sidebarElement.animate(
        sideRef.current === Side.LEFT
          ? ANIMATION_KEYFRAMES_SLIDE_IN_LEFT
          : ANIMATION_KEYFRAMES_SLIDE_IN_RIGHT,
        {
          duration: ANIMATION_DURATION,
          direction: 'reverse',
          fill: 'both',
          easing: ANIMATION_EASE_IN,
        }
      );
      sidebarAnimation.onfinish = postInvisibleAnim;
      const backdropAnimation = backdropElement.animate(
        ANIMATION_KEYFRAMES_FADE_IN,
        {
          duration: ANIMATION_DURATION,
          direction: 'reverse',
          fill: 'both',
          easing: ANIMATION_EASE_IN,
        }
      );
      sidebarAnimationRef.current = sidebarAnimation;
      backdropAnimationRef.current = backdropAnimation;
      animationDirectionRef.current = AnimationState.CLOSING;
    }
  }, [opened, onAfterCloseRef, sideRef, sidebarRef, backdropRef, setMounted]);
}
