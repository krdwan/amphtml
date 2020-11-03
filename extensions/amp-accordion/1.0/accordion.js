/**
 * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
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

import * as Preact from '../../../src/preact';
import {animateCollapse, animateExpand} from './animations';
import {forwardRef} from '../../../src/preact/compat';
import {omit} from '../../../src/utils/object';
import {
  randomIdGenerator,
  sequentialIdGenerator,
} from '../../../src/utils/id-generator';
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from '../../../src/preact';
import {useStyles} from './accordion.jss';

const AccordionContext = Preact.createContext(
  /** @type {AccordionDef.ContextProps} */ ({})
);

/** @type {!Object<string, boolean>} */
const EMPTY_EXPANDED_MAP = {};

const generateSectionId = sequentialIdGenerator();
const generateRandomId = randomIdGenerator(100000);

/**
 * @param {!AccordionDef.Props} props
 * @param {{current: (!AccordionDef.AccordionApi|null)}} ref
 * @return {PreactDef.Renderable}
 */
function AccordionWithRef(
  {
    as: Comp = 'section',
    expandSingleSection = false,
    animate = false,
    children,
    id,
    ...rest
  },
  ref
) {
  const [expandedMap, setExpandedMap] = useState(EMPTY_EXPANDED_MAP);
  const [randomPrefix] = useState(generateRandomId);
  const prefix = id || `a${randomPrefix}`;
  console.log('render!', expandedMap);

  useEffect(() => {
    if (!expandSingleSection) {
      return;
    }
    setExpandedMap((expandedMap) => {
      const newExpandedMap = {};
      let expanded = 0;
      for (const k in expandedMap) {
        newExpandedMap[k].value = expandedMap[k].value && expanded++ == 0;
      }
      return newExpandedMap;
    });
  }, [expandSingleSection]);

  const registerSection = useCallback(
    (id, defaultExpanded, onExpand, onCollapse) => {
      setExpandedMap((expandedMap) => {
        return setExpanded(
          id,
          defaultExpanded,
          expandedMap,
          expandSingleSection,
          onExpand,
          onCollapse
        );
      });
      return () => setExpandedMap((expandedMap) => omit(expandedMap, id));
    },
    [expandSingleSection]
  );
  console.log(expandedMap);

  const toggleExpanded = useCallback(
    (id) => {
      console.log('toggle', id);
      setExpandedMap((expandedMap) => {
        const newValue = !expandedMap[id].value;
        return setExpanded(
          id,
          newValue,
          expandedMap,
          expandSingleSection,
          expandedMap[id].onExpand,
          expandedMap[id].onCollapse
        );
      });
    },
    [expandSingleSection]
  );

  const isExpanded = useCallback(
    (id, defaultExpanded) => {
      const r = expandedMap[id] ? expandedMap[id].value : defaultExpanded;
      console.log('isexpanded', id, r);
      return r;
    },
    [expandedMap]
  );

  const toggle = useCallback(
    (id) => {
      if (id) {
        if (id in expandedMap) {
          toggleExpanded(id);
        }
      } else {
        // Toggle all should do nothing when expandSingleSection is true
        if (!expandSingleSection) {
          for (const k in expandedMap) {
            toggleExpanded(k);
          }
        }
      }
    },
    [expandedMap, toggleExpanded, expandSingleSection]
  );

  const expand = useCallback(
    (id) => {
      if (id) {
        if (!isExpanded(id, true)) {
          toggleExpanded(id);
        }
      } else {
        // Expand all should do nothing when expandSingleSection is true
        if (!expandSingleSection) {
          for (const k in expandedMap) {
            if (!isExpanded(k, true)) {
              toggleExpanded(k);
            }
          }
        }
      }
    },
    [expandedMap, toggleExpanded, isExpanded, expandSingleSection]
  );

  const collapse = useCallback(
    (id) => {
      if (id) {
        if (isExpanded(id, false)) {
          toggleExpanded(id);
        }
      } else {
        for (const k in expandedMap) {
          if (isExpanded(k, false)) {
            toggleExpanded(k);
          }
        }
      }
    },
    [expandedMap, toggleExpanded, isExpanded]
  );

  useImperativeHandle(
    ref,
    () =>
      /** @type {!AccordionDef.AccordionApi} */ ({
        toggle,
        expand,
        collapse,
      }),
    [toggle, collapse, expand]
  );

  const context = useMemo(
    () =>
      /** @type {!AccordionDef.ContextProps} */ ({
        registerSection,
        toggleExpanded,
        isExpanded,
        animate,
        prefix,
      }),
    [animate, registerSection, toggleExpanded, prefix, isExpanded]
  );

  return (
    <Comp id={id} {...rest}>
      <AccordionContext.Provider value={context}>
        {children}
      </AccordionContext.Provider>
    </Comp>
  );
}

const Accordion = forwardRef(AccordionWithRef);
Accordion.displayName = 'Accordion'; // Make findable for tests.
export {Accordion};

/**
 * @param {string} id
 * @param {boolean} value
 * @param {!Object<string, boolean>} expandedMap
 * @param {boolean} expandSingleSection
 * @param onExpand
 * @param onCollapse
 * @param onExpand
 * @param onCollapse
 * @return {!Object<string, boolean>}
 */
function setExpanded(
  id,
  value,
  expandedMap,
  expandSingleSection,
  onExpand,
  onCollapse
) {
  console.log('setExpand', id, value, expandedMap);
  let newExpandedMap;
  const newEntry = {value, onExpand, onCollapse};
  if (expandSingleSection && value) {
    newExpandedMap = {[id]: newEntry};
    for (const k in expandedMap) {
      if (k != id) {
        newExpandedMap[k] = {...expandedMap[k], value: false};
      }
    }
  } else {
    newExpandedMap = {...expandedMap, [id]: newEntry};
  }
  console.log('setExpand', newExpandedMap);
  //return newExpandedMap;
  return {...newExpandedMap};
}

/**
 * @param {!AccordionDef.SectionProps} props
 * @return {PreactDef.Renderable}
 */
export function AccordionSection({
  as: Comp = 'section',
  headerAs: HeaderComp = 'header',
  contentAs: ContentComp = 'div',
  expanded: defaultExpanded = false,
  animate: defaultAnimate = false,
  headerClassName = '',
  contentClassName = '',
  id: propId,
  header,
  children,
  onExpand,
  onCollapse,
  ...rest
}) {
  const [genId] = useState(generateSectionId);
  const id = propId || genId;
  const [suffix] = useState(generateRandomId);
  const [expandedState, setExpandedState] = useState(defaultExpanded);
  const contentRef = useRef(null);
  const hasMountedRef = useRef(false);

  const {
    registerSection,
    animate: contextAnimate,
    isExpanded,
    toggleExpanded,
    prefix,
  } = useContext(AccordionContext);

  useEffect(() => {
    hasMountedRef.current = true;
    return () => (hasMountedRef.current = false);
  }, []);

  useLayoutEffect(() => {
    if (registerSection) {
      return registerSection(id, defaultExpanded, onExpand, onCollapse);
    }
  }, [registerSection, id, defaultExpanded, onExpand, onCollapse]);

  const expanded = isExpanded ? isExpanded(id, defaultExpanded) : expandedState;
  console.log('after expanded', id, expanded);
  const animate = contextAnimate ?? defaultAnimate;
  const contentId = `${prefix || 'a'}-content-${id}-${suffix}`;
  const classes = useStyles();
  console.log('ex', expanded);

  const expandHandler = useCallback(() => {
    if (toggleExpanded) {
      toggleExpanded(id);
    } else {
      setExpandedState((prev) => !prev);
    }

    if (expanded && onCollapse) {
      onCollapse();
    } else if (onExpand) {
      onExpand();
    }
  }, [id, toggleExpanded, expanded, onCollapse, onExpand]);

  useLayoutEffect(() => {
    const hasMounted = hasMountedRef.current;
    const content = contentRef.current;
    if (!animate || !hasMounted || !content || !content.animate) {
      return;
    }
    return expanded ? animateExpand(content) : animateCollapse(content);
  }, [expanded, animate]);

  return (
    <Comp {...rest} expanded={expanded}>
      <HeaderComp
        role="button"
        className={`${headerClassName} ${classes.sectionChild} ${classes.header}`}
        aria-controls={contentId}
        tabIndex="0"
        onClick={expandHandler}
        aria-expanded={String(expanded)}
      >
        {header}
      </HeaderComp>
      <ContentComp
        ref={contentRef}
        className={`${contentClassName} ${classes.sectionChild} ${classes.content}`}
        id={contentId}
        hidden={!expanded}
      >
        {children}
      </ContentComp>
    </Comp>
  );
}
