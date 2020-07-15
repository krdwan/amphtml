import * as Preact from '../../src/preact';

/**
 * @param {!JsonObject} props
 * @return {PreactDef.Renderable}
 */
export function SocialShareIcon(props) {
  switch (props['type']) {
    case 'FACEBOOK':
      return (
        <svg {...props} viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M211.9 197.4h-36.7v59.9h36.7v175.8h70.5V256.5h49.2l5.2-59.1h-54.4v-33.7c0-13.9 2.8-19.5 16.3-19.5h38.2V82.9h-48.8c-52.5 0-76.1 23.1-76.1 67.3-.1 38.6-.1 47.2-.1 47.2z"
          ></path>
        </svg>
      );
    case 'PINTEREST':
      return (
        <svg {...props} viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M266.6 76.5c-100.2 0-150.7 71.8-150.7 131.7 0 36.3 13.7 68.5 43.2 80.6 4.8 2 9.2.1 10.6-5.3 1-3.7 3.3-13 4.3-16.9 1.4-5.3.9-7.1-3-11.8-8.5-10-13.9-23-13.9-41.3 0-53.3 39.9-101 103.8-101 56.6 0 87.7 34.6 87.7 80.8 0 60.8-26.9 112.1-66.8 112.1-22.1 0-38.6-18.2-33.3-40.6 6.3-26.7 18.6-55.5 18.6-74.8 0-17.3-9.3-31.7-28.4-31.7-22.5 0-40.7 23.3-40.7 54.6 0 19.9 6.7 33.4 6.7 33.4s-23.1 97.8-27.1 114.9c-8.1 34.1-1.2 75.9-.6 80.1.3 2.5 3.6 3.1 5 1.2 2.1-2.7 28.9-35.9 38.1-69 2.6-9.4 14.8-58 14.8-58 7.3 14 28.7 26.3 51.5 26.3 67.8 0 113.8-61.8 113.8-144.5-.1-62.6-53.1-120.8-133.6-120.8z"
          ></path>
        </svg>
      );
    case 'LINKEDIN':
      return (
        <svg {...props} viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M186.4 142.4c0 19-15.3 34.5-34.2 34.5-18.9 0-34.2-15.4-34.2-34.5 0-19 15.3-34.5 34.2-34.5 18.9 0 34.2 15.5 34.2 34.5zm-5 58.9h-57.8v186.8h57.8V201.3zm92.4 0h-55.4v186.8h55.4v-98c0-26.3 12.1-41.9 35.2-41.9 21.3 0 31.5 15 31.5 41.9v98H398V269.8c0-50-28.3-74.2-68-74.2-39.6 0-56.3 30.9-56.3 30.9v-25.2h.1z"
          ></path>
        </svg>
      );
    case 'EMAIL':
      return (
        <svg {...props} viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M101.3 141.6v228.9h309.5V141.6H101.3zm274.4 26.2L256 259.3l-119.6-91.5h239.3zm-248.1 26.3l64.1 49.1-64.1 64.1V194.1zm.2 150.1l84.9-84.9 43.2 33.1 43-32.9 84.7 84.7H127.8zm256.6-36.4L320 243.4l64.4-49.3v113.7z"
          ></path>
        </svg>
      );
    case 'TWITTER':
      return (
        <svg {...props} viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36-12.6 7.5-26.5 12.9-41.3 15.8C357.6 146 340.7 138 322 138c-42 0-72.9 39.2-63.4 79.9-54.1-2.7-102.1-28.6-134.2-68-17 29.2-8.8 67.5 20.1 86.9-10.7-.3-20.7-3.3-29.5-8.1-.7 30.2 20.9 58.4 52.2 64.6-9.2 2.5-19.2 3.1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2-27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 120.8 0 189.1-102.1 185-193.6 12.9-9.1 23.9-20.5 32.6-33.6z"
          ></path>
        </svg>
      );
    case 'TUMBLR':
      return (
        <svg {...props} viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M210.8 80.3c-2.3 18.3-6.4 33.4-12.4 45.2-6 11.9-13.9 22-23.9 30.5-9.9 8.5-21.8 14.9-35.7 19.5v50.6h38.9v124.5c0 16.2 1.7 28.6 5.1 37.1 3.4 8.5 9.5 16.6 18.3 24.2 8.8 7.6 19.4 13.4 31.9 17.5s26.8 6.1 43 6.1c14.3 0 27.6-1.4 39.9-4.3 12.3-2.9 26-7.9 41.2-15v-55.9c-17.8 11.7-35.7 17.5-53.7 17.5-10.1 0-19.1-2.4-27-7.1-5.9-3.5-10-8.2-12.2-14-2.2-5.8-3.3-19.1-3.3-39.7v-91.1h84.6v-55.8h-84.4v-90h-50.3z"
          ></path>
        </svg>
      );
    case 'WHATSAPP':
      return (
        <svg {...props} viewBox="0 0 46 46">
          <path
            fill="currentColor"
            d="M35.4 10.4C32 6.9 27.3 5 22.5 5 12.3 5 4.1 13.3 4.2 23.4c0 3.2.9 6.3 2.4 9.1L4 42l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM22.5 38.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L9.9 32l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9 7.2-4.4 16.5-2.3 20.9 4.9 4.4 7.2 2.3 16.5-4.9 20.9-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5.2-.2.4-.4.5-.6.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
          ></path>
        </svg>
      );
    case 'LINE':
      return (
        <svg {...props} viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M443.2 233.29c0-84.14-84.35-152.6-188-152.6s-188 68.46-188 152.6c0 75.43 66.9 138.61 157.26 150.55 6.13 1.32 14.46 4 16.57 9.27 1.89 4.76 1.24 12.2.61 17 0 0-2.21 13.26-2.69 16.09-.82 4.75-3.78 18.6 16.29 10.14s108.21-63.76 147.66-109.16c27.25-29.89 40.3-60.18 40.3-93.89zm-254.38 44.92a3.67 3.67 0 01-3.66 3.67h-52.69a3.6 3.6 0 01-2.53-1l-.06-.05v-.05a3.65 3.65 0 01-1-2.53v-81.96a3.66 3.66 0 013.66-3.66h13.19a3.66 3.66 0 013.66 3.66v65.07h35.84a3.66 3.66 0 013.66 3.66zm31.8 0a3.65 3.65 0 01-3.66 3.65h-13.2a3.65 3.65 0 01-3.66-3.65v-81.92a3.66 3.66 0 013.66-3.66H217a3.66 3.66 0 013.66 3.66zm90.78 0a3.65 3.65 0 01-3.66 3.65h-13.19a3.67 3.67 0 01-.94-.12h-.05l-.25-.08h-.11l-.18-.08-.17-.08-.11-.06-.22-.14a3.45 3.45 0 01-.93-.9L254 229.56v48.66a3.66 3.66 0 01-3.67 3.65H237.1a3.65 3.65 0 01-3.66-3.65v-81.93a3.66 3.66 0 013.66-3.66h13.86l.21.05h.13l.21.07h.12a1.31 1.31 0 01.21.08l.12.06.19.11a.41.41 0 01.11.07l.19.13.1.07.19.16.07.07a2.28 2.28 0 01.22.22 3.58 3.58 0 01.28.37L290.89 245v-48.71a3.66 3.66 0 013.66-3.66h13.19a3.66 3.66 0 013.66 3.66zm72.83-68.74a3.66 3.66 0 01-3.65 3.67h-35.84V227h35.84a3.66 3.66 0 013.65 3.67v13.19a3.65 3.65 0 01-3.65 3.66h-35.84v13.85h35.84a3.65 3.65 0 013.65 3.66v13.19a3.66 3.66 0 01-3.65 3.67h-52.7a3.66 3.66 0 01-2.53-1l-.05-.05a.12.12 0 01-.05-.05 3.65 3.65 0 01-1-2.53V196.3a3.6 3.6 0 011-2.52l.06-.07a3.63 3.63 0 012.54-1h52.7a3.66 3.66 0 013.65 3.67z"
            data-name="レイヤー 1"
          ></path>
        </svg>
      );
    case 'SMS':
      return (
        <svg {...props} viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M70 75v290h60v90l150-90h166v-290h-376zm30 30h316v230h-136l-120 72v-72h-60v-246z"
          ></path>
        </svg>
      );
    case 'SYSTEM':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path>
        </svg>
      );
    default:
      return <svg {...props}></svg>;
  }
}
