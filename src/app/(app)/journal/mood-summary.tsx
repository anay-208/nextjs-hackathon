import type { SVGProps } from "react"

export function MoodSummary(props: {
  mood?: number,
  energy?: number,
  productivity?: number,
}) {

  const MoodIcon = props.mood
    ? moodElementMap[Math.max(Math.min(props.mood, 5), 1)-1]
    : <TwemojiNeutralFace className="opacity-50 saturate-0" />

  const EnergyIcon = props.energy
    ? energyElementMap[Math.max(Math.min(props.energy, 5), 1)-1]
    : <MaterialSymbolsBatteryUnknownOutline className="opacity-30 saturate-0"/>

  const ProductivityIcon = props.productivity
    ? productivityElementMap[Math.max(Math.min(props.productivity, 5), 1)-1]
    : null
    
  return (
    <>
      {MoodIcon}
      {EnergyIcon}
      {ProductivityIcon}
    </>
  )
}

export const moodElementMap = [
  <TwemojiPensiveFace key='m1' />,
  <TwemojiFrowningFaceWithOpenMouth key='m2' />,
  <TwemojiSlightlySmilingFace key='m3' />,
  <TwemojiSmilingFaceWithSmilingEyes key='m4' />,
  <TwemojiStarStruck key='m5' />
]

export const energyElementMap = [
  <MaterialSymbolsBattery0Bar key='e0' className="text-red-600"/>,
  <MaterialSymbolsBattery2Bar key='e1' className="text-amber-600"/>,
  <MaterialSymbolsBattery3Bar key='e2' className="text-yellow-600"/>,
  <MaterialSymbolsBattery5Bar key='e3' className="text-lime-600"/>,
  <MaterialSymbolsBatteryFull key='e4' className="text-emerald-600"/>
]

export const productivityElementMap = [
  <TwemojiSkull key='p0'/>,
  <TwemojiTurtle key='p1'/>,
  <TwemojiRabbit key='p2'/>,
  <TwemojiHorse key='p3'/>,
  <TwemojiRocket key='p4'/>
]

// Mood

export function TwemojiPensiveFace(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>{/* Icon from Twitter Emoji by Twitter - https://creativecommons.org/licenses/by/4.0/ */}<path fill="#FFCC4D" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><path fill="#664500" d="M17.312 17.612a.5.5 0 0 0-.61-.014c-.012.009-1.26.902-3.702.902c-2.441 0-3.69-.893-3.7-.9a.5.5 0 0 0-.757.603c.06.135 1.5 3.297 4.457 3.297c2.958 0 4.397-3.162 4.457-3.297a.5.5 0 0 0-.145-.591m10 0a.5.5 0 0 0-.61-.014c-.012.009-1.261.902-3.702.902s-3.69-.893-3.7-.9a.5.5 0 0 0-.757.603c.06.135 1.5 3.297 4.457 3.297c2.958 0 4.397-3.162 4.457-3.297a.5.5 0 0 0-.145-.591M22 28h-8a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2M6 14a1 1 0 0 1-.004-2c.156-.002 3.569-.086 6.205-3.6a1 1 0 0 1 1.6 1.2C10.538 13.95 6.184 14 6 14m24 0c-.184 0-4.537-.05-7.8-4.4a1 1 0 1 1 1.599-1.2c2.641 3.521 6.061 3.599 6.206 3.6c.55.006.994.456.991 1.005A.996.996 0 0 1 30 14"></path></svg>
  )
}
export function TwemojiFrowningFaceWithOpenMouth(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>{/* Icon from Twitter Emoji by Twitter - https://creativecommons.org/licenses/by/4.0/ */}<path fill="#FFCC4D" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx="11.5" cy="16.5" fill="#664500" rx="2.5" ry="3.5"></ellipse><ellipse cx="24.5" cy="16.5" fill="#664500" rx="2.5" ry="3.5"></ellipse><path fill="#664500" d="M23.485 27.879C23.474 27.835 22.34 23.5 18 23.5s-5.474 4.335-5.485 4.379a.5.5 0 0 0 .232.544a.51.51 0 0 0 .596-.06c.009-.008 1.013-.863 4.657-.863c3.59 0 4.617.83 4.656.863a.5.5 0 0 0 .829-.484"></path></svg>
  )
}
export function TwemojiSlightlySmilingFace(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>{/* Icon from Twitter Emoji by Twitter - https://creativecommons.org/licenses/by/4.0/ */}<circle cx="18" cy="18" r="18" fill="#FFCC4D"></circle><path fill="#664500" d="M10.515 23.621C10.56 23.8 11.683 28 18 28s7.44-4.2 7.485-4.379a.5.5 0 0 0-.237-.554a.505.505 0 0 0-.6.077C24.629 23.163 22.694 25 18 25s-6.63-1.837-6.648-1.855a.5.5 0 0 0-.598-.081a.5.5 0 0 0-.239.557"></path><ellipse cx="12" cy="13.5" fill="#664500" rx="2.5" ry="3.5"></ellipse><ellipse cx="24" cy="13.5" fill="#664500" rx="2.5" ry="3.5"></ellipse></svg>
  )
}
export function TwemojiSmilingFaceWithSmilingEyes(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>{/* Icon from Twitter Emoji by Twitter - https://creativecommons.org/licenses/by/4.0/ */}<path fill="#FFCC4D" d="M36 18c0 9.941-8.059 18-18 18S0 27.941 0 18S8.059 0 18 0s18 8.059 18 18"></path><circle cx="7" cy="18" r="5" fill="#FF7892"></circle><circle cx="29" cy="18" r="5" fill="#FF7892"></circle><path fill="#664500" d="M27.335 21.629a.5.5 0 0 0-.635-.029c-.039.029-3.922 2.9-8.7 2.9c-4.766 0-8.662-2.871-8.7-2.9a.5.5 0 0 0-.729.657C8.7 22.472 11.788 27.5 18 27.5s9.301-5.028 9.429-5.243a.5.5 0 0 0-.094-.628M7.999 15a1 1 0 0 1-.893-1.448C7.158 13.448 8.424 11 12 11s4.842 2.449 4.894 2.553a1 1 0 0 1-1.783.906C15.068 14.379 14.281 13 12 13c-2.317 0-3.099 1.433-3.106 1.447a1 1 0 0 1-.895.553m20.002 0a1 1 0 0 1-.896-.553C27.08 14.401 26.299 13 24 13s-3.08 1.401-3.112 1.46c-.26.481-.859.67-1.345.42a.994.994 0 0 1-.438-1.328C19.157 13.449 20.423 11 24 11s4.843 2.449 4.895 2.553A1 1 0 0 1 28.001 15"></path></svg>
  )
}
export function TwemojiStarStruck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>{/* Icon from Twitter Emoji by Twitter - https://creativecommons.org/licenses/by/4.0/ */}<path fill="#FFCC4D" d="M36 18c0 9.941-8.059 18-18 18S0 27.941 0 18S8.059 0 18 0s18 8.059 18 18"></path><path fill="#664500" d="M18 21c-3.623 0-6.027-.422-9-1c-.679-.131-2 0-2 2c0 4 4.595 9 11 9c6.404 0 11-5 11-9c0-2-1.321-2.132-2-2c-2.973.578-5.377 1-9 1"></path><path fill="#FFF" d="M9 22s3 1 9 1s9-1 9-1s-2 4-9 4s-9-4-9-4"></path><path fill="#E95F28" d="m15.682 4.413l-4.542.801L8.8.961a1.252 1.252 0 0 0-2.331.411l-.745 4.797l-4.542.801a1.25 1.25 0 0 0-.318 2.361l4.07 1.932l-.748 4.812a1.253 1.253 0 0 0 1.235 1.442c.327 0 .65-.128.891-.372l3.512-3.561l4.518 2.145a1.25 1.25 0 0 0 1.631-1.731L13.625 9.73l3.165-3.208a1.252 1.252 0 0 0-1.108-2.109m4.636 0l4.542.801L27.2.961a1.251 1.251 0 0 1 2.33.411l.745 4.797l4.542.801c.536.094.949.524 1.021 1.063s-.211 1.063-.703 1.297l-4.07 1.932l.748 4.812a1.253 1.253 0 0 1-1.235 1.442c-.327 0-.65-.128-.891-.372l-3.512-3.561l-4.518 2.145a1.25 1.25 0 0 1-1.631-1.731l2.348-4.267l-3.165-3.208a1.25 1.25 0 0 1-.217-1.459a1.26 1.26 0 0 1 1.326-.65"></path></svg>
  )
}

export function TwemojiNeutralFace(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>{/* Icon from Twitter Emoji by Twitter - https://creativecommons.org/licenses/by/4.0/ */}<path fill="#FFCC4D" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx="11.5" cy="16.5" fill="#664500" rx="2.5" ry="3.5"></ellipse><ellipse cx="24.5" cy="16.5" fill="#664500" rx="2.5" ry="3.5"></ellipse><path fill="#664500" d="M25 26H11a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2"></path></svg>
  )
}



//  Energy


export function MaterialSymbolsBatteryUnknownOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M16.4 19.45q0-.35.013-.687t.187-.638q.25-.425.638-.725t.662-.7q.075-.1.175-.575q0-.425-.325-.7T17 15.15t-.75.275t-.45.7l-1.1-.475q.25-.75.875-1.2T17 14q.925 0 1.613.6t.687 1.5q0 .275-.075.513T19 17.05q-.275.4-.65.713t-.6.737q-.15.275-.15.95zM17 22q-.35 0-.6-.237t-.25-.588t.25-.6t.6-.25t.588.25t.237.6t-.237.588T17 22m-9 0q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.525 0-1.025.088T15 12.35V6H9v14h2.35q.2.575.488 1.075t.687.925z"></path></svg>
  )
}
export function MaterialSymbolsBattery0Bar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M8 22q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v16q0 .425-.288.713T16 22zm1-2h6V6H9z"></path></svg>
  )
}
export function MaterialSymbolsBattery2Bar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M8 22q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v16q0 .425-.288.713T16 22zm1-6h6V6H9z"></path></svg>
  )
}
export function MaterialSymbolsBattery3Bar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M8 22q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v16q0 .425-.288.713T16 22zm1-8h6V6H9z"></path></svg>
  )
}
export function MaterialSymbolsBattery5Bar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M8 22q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v16q0 .425-.288.713T16 22zm1-12h6V6H9z"></path></svg>
  )
}
export function MaterialSymbolsBatteryFull(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M8 22q-.425 0-.712-.288T7 21V5q0-.425.288-.712T8 4h2V2h4v2h2q.425 0 .713.288T17 5v16q0 .425-.288.713T16 22z"></path></svg>
  )
}

//  Productivity


export function TwemojiSkull(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>{/* Icon from Twitter Emoji by Twitter - https://creativecommons.org/licenses/by/4.0/ */}<path fill="#CCD6DD" d="M34 16C34 6 26.837 0 18 0S2 6 2 16c0 5.574.002 10.388 6 12.64V33a3 3 0 1 0 6 0v-3.155q.487.04 1 .07V33a3 3 0 1 0 6 0v-3.085q.513-.03 1-.07V33a3 3 0 0 0 6 0v-4.36c5.998-2.252 6-7.066 6-12.64"></path><circle cx="11" cy="14" r="5" fill="#292F33"></circle><circle cx="25" cy="14" r="5" fill="#292F33"></circle><path fill="#292F33" d="M19.903 23.062C19.651 22.449 18.9 22 18 22s-1.652.449-1.903 1.062A1.494 1.494 0 0 0 15 24.5a1.5 1.5 0 0 0 1.5 1.5c.655 0 1.206-.422 1.41-1.007c.03.001.059.007.09.007s.06-.006.09-.007a1.496 1.496 0 1 0 1.813-1.931"></path></svg>
  )
}
export function TwemojiTurtle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>{/* Icon from Twitter Emoji by Twitter - https://creativecommons.org/licenses/by/4.0/ */}<path fill="#77B255" d="M9.842 19.922c0 9.842 6.575 9.673 5.158 10.078c-7 2-8.803-7.618-9.464-7.618c-2.378 0-5.536-.423-5.536-2.46C0 17.883 2.46 15 6.151 15c2.379 0 3.691 2.883 3.691 4.922M36 28.638c0 1.104-3.518-.741-5 0c-2 1-2-.896-2-2s1.343-1 3-1s4 1.895 4 3"></path><path fill="#77B255" d="M16.715 33.143c0 2.761-1.279 2.857-2.857 2.857S11 35.903 11 33.143c0-.489.085-1.029.234-1.587c.69-2.59 2.754-5.556 4.052-5.556c1.578 0 1.429 4.382 1.429 7.143m8.571 0c0 2.761 1.278 2.857 2.856 2.857C29.721 36 31 35.903 31 33.143a6.3 6.3 0 0 0-.234-1.587C30.075 28.966 28.012 26 26.714 26c-1.578 0-1.428 4.382-1.428 7.143"></path><path fill="#3E721D" d="M32 27c0 4-5.149 4-11.5 4S9 31 9 27c0-6.627 5.149-12 11.5-12S32 20.373 32 27"></path><circle cx="5" cy="18" r="1" fill="#292F33"></circle><path fill="#5C913B" d="M23.667 25.1c0 3.591-1.418 3.9-3.167 3.9s-3.167-.31-3.167-3.9S18.75 17 20.5 17s3.167 4.51 3.167 8.1M30 24c.871 3.482-.784 4-2.533 4s-2.533.69-2.533-2.9s-1.116-6.5.633-6.5C27.315 18.6 29 20 30 24m-13.933 1.1c0 3.591-.785 2.9-2.534 2.9s-3.404-.518-2.533-4c1-4 3.251-5.4 5-5.4s.067 2.91.067 6.5"></path></svg>
  )
}
export function TwemojiRabbit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>{/* Icon from Twitter Emoji by Twitter - https://creativecommons.org/licenses/by/4.0/ */}<path fill="#99AAB5" d="M9 11C9 6.858 7 0 8 0s7 4 5 11c-1.138 3.983-.896 4-2 4s-2 .142-2-4"></path><path fill="#F4ABBA" d="M9.55 11.704c0-3.414-1.297-9.065-.648-9.065s4.538 3.296 3.241 9.065C11.405 14.986 11.562 15 10.846 15s-1.296.117-1.296-3.296"></path><path fill="#99AAB5" d="M4.789 12.375C3.726 8.372.033 2.256 1 2c.966-.257 7.792 2.07 7.655 9.349c-.078 4.142.161 4.096-.907 4.379s-1.897.65-2.959-3.353"></path><path fill="#F4ABBA" d="M5.5 12.914c-.875-3.299-3.579-8.429-2.952-8.595s5.232 2.022 5.458 7.93c.129 3.361.285 3.335-.407 3.519c-.692.183-1.223.445-2.099-2.854"></path><circle cx="32.5" cy="28.5" r="3.5" fill="#CCD6DD"></circle><path fill="#99AAB5" d="M30.733 31.736C32.227 30.354 33 28.218 33 25c0-7.18-6.82-11-14-11c-2.057 0-3.829.157-5.323.54C12.592 13.41 10.817 13 8.4 13C4.136 13 0 17.069 0 21.333c0 4.13 3.88 4.637 7.999 4.664L8 26c3 5 1 10 3 10c1.588 0 1.914-2.217 1.981-4.375a15 15 0 0 0 3.531 1.577C15.635 33.726 15 34.271 15 34.5c0 1.381 2 1.5 5 1.5c5.522 0 13 0 11-4a.7.7 0 0 0-.267-.264"></path><circle cx="6" cy="18" r="1" fill="#292F33"></circle><path fill="#F4ABBA" d="M2 21c0 1.104-.5 2-1 2s-1-.896-1-2s.448-1 1-1s1-.104 1 1"></path></svg>
  )
}
export function TwemojiHorse(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>{/* Icon from Twitter Emoji by Twitter - https://creativecommons.org/licenses/by/4.0/ */}<path fill="#292F33" d="M28.721 12.849s3.809 1.643 5.532.449q2.585-1.79 1.159-4.736C34.461 6.601 31.789 5.83 31.7 3.27c0 0-.298 4.141 1.513 5.505c2.562 1.933-.446 4.21-3.522 3.828c-3.078-.382-.97.246-.97.246"></path><path fill="#8A4B38" d="M23.875 19.375s-.628 2.542.187 5.03c.145.341.049.556-.208.678c-.256.122-4.294 1.542-4.729 1.771c-.396.208-1.142 1.78-1.208 2.854c.844.218 1.625.104 1.625.104s.025-1.915.208-2.042s5.686-1.048 6.062-1.771s1.611-3.888.812-5.292c-.225-.395-.637-1.15-.637-1.15z"></path><path fill="#292F33" d="M17.917 29.708s-.616 1.993.008 2.138c.605.141 1.694-.388 1.755-.646c.081-.343.216-1.179.098-1.366c-.118-.186-1.861-.126-1.861-.126"></path><path fill="#8A4B38" d="m11.812 21.875l-.75-2.562s-2.766 2.105-3.938 3.594c-.344.437-1.847 3.198-1.722 4.413c.05.488.474 2.583.474 2.583l1.651-.465s-1.312-1.896-1.021-2.562c1.428-3.263 5.306-5.001 5.306-5.001"></path><path fill="#292F33" d="M7.679 29.424c-.172-.139-1.803.479-1.803.479s.057 2.085.695 2.022c.618-.061 1.48-.912 1.455-1.175c-.034-.351-.175-1.187-.347-1.326"></path><path fill="#C1694F" d="M27.188 11.188c-3.437.156-7.207.438-9.5.438c-3.655 0-5.219-1.428-6.562-2.625C8.838 6.964 8.167 4.779 6 5.501c0 0-.632-.411-1.247-.778l-.261-.152a7 7 0 0 0-.656-.347c-.164-.072-.258-.087-.228-.01c.019.051.093.143.236.286c.472.472.675.95.728 1.395c-2.01 1.202-2.093 2.276-2.871 3.552c-.492.807-1.36 2.054-1.56 2.515c-.412.948 1.024 2.052 1.706 1.407c.893-.845.961-1.122 2.032-1.744c.983-.016 1.975-.416 2.308-1.02c0 0 .938 2.083 1.938 3.583s2.5 3.125 2.5 3.125c-.131 1.227.12 2.176.549 2.922c-.385.757-.924 1.807-1.417 2.745c-.656 1.245-1.473 3.224-1.208 3.618c.534.798 2.719 2.926 4.137 3.311c1.03.28 2.14.437 2.14.437l-.193-1.574s-1.343.213-1.875-.083c-1.427-.795-2.666-2.248-2.708-2.542c-.07-.487 3.841-2.868 5.14-3.645c2.266.097 6.022-.369 8.626-1.702c.958 1.86 2.978 2.513 2.978 2.513s.667 2.208 1.375 4.125c-1.017.533-4.468 3.254-4.975 3.854c-.456.54-.856 2.49-.856 2.49c.82.375 1.57.187 1.57.187s.039-1.562.385-2.073s4.701-2.559 5.958-3.458c.492-.352.404-.903.262-1.552c-.321-1.471-.97-4.781-.971-4.782c5.146-2.979 6.458-11.316-2.354-10.916"></path><path fill="#292F33" d="M22.336 33.782s-.616 1.993.008 2.138c.605.141 1.694-.388 1.755-.646c.081-.343.216-1.179.098-1.366s-1.861-.126-1.861-.126m-7.676-5.296c-.167.146.164 1.859.164 1.859s2.064.299 2.111-.34c.045-.62-.647-1.614-.91-1.634c-.351-.027-1.198-.031-1.365.115"></path><circle cx="4.25" cy="8.047" r=".349" fill="#292F33"></circle><path fill="#292F33" d="M12.655 9.07c1.773 1.446 3.147.322 3.147.322c-1.295-.271-2.056-.867-2.708-1.562c.835-.131 1.287-.666 1.287-.666c-1.061-.013-1.824-.3-2.485-.699c-.565-.614-1.233-1.202-2.254-1.631a5 5 0 0 0-.922-.276c-.086-.025-.178-.063-.258-.073a4.13 4.13 0 0 0-2.737.603c-.322.2-.214.639.117.623c1.741-.085 2.866.582 3.47 1.633c2.169 3.772 5.344 3.875 5.344 3.875s-1.29-.688-2.001-2.149"></path></svg>
  )
}
export function TwemojiRocket(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36" {...props}>{/* Icon from Twitter Emoji by Twitter - https://creativecommons.org/licenses/by/4.0/ */}<path fill="#A0041E" d="m1 17l8-7l16 1l1 16l-7 8s.001-5.999-6-12s-12-6-12-6"></path><path fill="#FFAC33" d="M.973 35s-.036-7.979 2.985-11S15 21.187 15 21.187S14.999 29 11.999 32S.973 35 .973 35"></path><circle cx="8.999" cy="27" r="4" fill="#FFCC4D"></circle><path fill="#55ACEE" d="M35.999 0s-10 0-22 10c-6 5-6 14-4 16s11 2 16-4c10-12 10-22 10-22"></path><path d="M26.999 5a4 4 0 0 0-3.641 2.36A4 4 0 0 1 24.999 7a4 4 0 0 1 4 4c0 .586-.133 1.139-.359 1.64A3.99 3.99 0 0 0 30.999 9a4 4 0 0 0-4-4"></path><path fill="#A0041E" d="M8 28s0-4 1-5s13.001-10.999 14-10s-9.001 13-10.001 14S8 28 8 28"></path></svg>
  )
}