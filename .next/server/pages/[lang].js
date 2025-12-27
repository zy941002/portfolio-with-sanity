(()=>{var e={};e.id=860,e.ids=[220,636,860],e.modules={361:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},2015:e=>{"use strict";e.exports=require("react")},2081:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>l});var n=a(8732);a(9001);var s=a(9788),r=a.n(s),i=a(2015),o=a(4233);function l({Component:e,pageProps:t}){(0,o.useRouter)();let[a,s]=(0,i.useState)(!1);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r(),{children:[(0,n.jsx)("title",{children:"gallery瓦聞"}),(0,n.jsx)("meta",{name:"description",content:"gallery瓦聞"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,n.jsx)("link",{rel:"preload",href:"/fonts/方正兰亭黑_GBK.TTF",as:"font",type:"font/ttf",crossOrigin:"anonymous"})]}),(0,n.jsx)("div",{className:`page-transition-wrapper ${a?"transitioning":""}`,children:(0,n.jsx)(e,{...t})})]})}},2326:e=>{"use strict";e.exports=require("react-dom")},2356:(e,t,a)=>{"use strict";a.d(t,{Iy:()=>o,K:()=>i,lb:()=>n,mN:()=>s,u_:()=>l});let n={"zh-hans":"zhHans","zh-hant":"zhHant",en:"en"},s=[{param:"en",label:"En"},{param:"zh-hans",label:"中文简体"},{param:"zh-hant",label:"中文繁體"}],r="zh-hans";function i(e){let t=Array.isArray(e)?e[0]:e;return t&&t in n?n[t]:n[r]}function o(e){let t=Array.isArray(e)?e[0]:e;return t&&t in n?t:r}function l(e,t){let a=t.filter(Boolean).join("/");return`/${e}${a?`/${a}`:""}`}},3873:e=>{"use strict";e.exports=require("path")},4075:e=>{"use strict";e.exports=require("zlib")},4178:(e,t,a)=>{"use strict";a.a(e,async(e,n)=>{try{a.d(t,{Nt:()=>i,d:()=>o,kz:()=>u,ml:()=>l,ri:()=>c,uP:()=>d});var s=a(9728),r=e([s]);s=(r.then?(await r)():r)[0];let i=(0,s.groq)`
*[_type == "homePage"][0]{
  sections[]{
    _key,
    _type,
    "backgroundImage": background.asset->url,
    languageLinks[]{
      label,
      href
    },
    eyebrow,
    title,
    quote,
    author,
    source,
    body,
    signature,
    items[]{
      _key,
      label,
      description,
      "iconUrl": icon.asset->url,
      "slug": slug.current,
      link
    },
    studioName,
    address,
    phone,
    mobile,
    email,
    businessHours,
    notes,
    image{
      "zhHans": zhHans.asset->url,
      "zhHant": zhHant.asset->url,
      "en": en.asset->url
    },
    alt,
    platforms[]{
      _key,
      "logoUrl": logo.asset->url,
      "qrCodeUrl": qrCode.asset->url
    }
  }
}
`;(0,s.groq)`
*[_type in ["productCategory", "productCategoryLevel2"]]{
  _id
}
`;let o=(0,s.groq)`
*[_type == "productCategory" && level == 1] | order(sortOrder asc, label.zhHans asc){
  _id,
  label,
  tags,
  level,
  sortOrder,
  isEvent,
  "coverURL": coverURL.asset->url,
  "children": children[]-> {
    _id,
    label,
    level,
    isEvent,
    "coverURL": coverURL.asset->url
  }
}
`,l=(0,s.groq)`
*[_type == "productItem"]{
  _id
}
`,c=(0,s.groq)`
*[_type == "productItem" && _id == $id][0]{
  _id,
  "slug": slug.current,
  title,
  tags,
  summary,
  description,
  "gallery": gallery[].asset->url,
  "videoUrl": video.asset->url,
  videoLink,
  materials,
  size,
  price,
  "level1Category": level1Category-> {
    _id,
    "title": label,
    level,
    "coverURL": coverURL.asset->url
  },
  "level2Category": level2Category-> {
    _id,
    "title": label,
    level,
    "coverURL": coverURL.asset->url
  }
}
`,d=(0,s.groq)`
coalesce(
  *[_type == "productCategory" && _id == $id][0]{
    _id,
    "title": label,
    tags,
    level,
    sortOrder,
    isEvent,
    "coverURL": coverURL.asset->url,
    leftColumnTitle,
    leftColumnDescription,
    relatedEvents[]->{
      _id,
      title,
      description,
      startDate,
      endDate,
      "cover": cover.asset->url
    },
    featuredProducts[]->{
      _id,
      title,
      tags,
      summary,
      "thumbnail": gallery[0].asset->url,
      price
    },
    "children": children[]-> {
      _id,
      "title": label,
      level,
      isEvent,
      "coverURL": coverURL.asset->url
    },
    "products": *[_type == "productItem" && level1Category._ref == ^._id] | order(sortOrder asc){
      _id,
      "slug": slug.current,
      title,
      tags,
      summary,
      description,
      materials,
      size,
      price,
      isEvent,
      isExpired,
      "thumbnail": coalesce(gallery[0].asset->url, "")
    },
    "events": *[_type == "event" && level1Category._ref == ^._id] | order(startDate desc){
      _id,
      title,
      description,
      startDate,
      endDate,
      "cover": cover.asset->url
    }
  },
  *[_type == "productCategoryLevel2" && _id == $id][0]{
    _id,
    "title": label,
    level,
    isEvent,
    "coverURL": coverURL.asset->url,
    "parent": *[_type == "productCategory" && ^._id in children[]._ref][0]{
      _id,
      "title": label,
      tags,
      level,
      isEvent,
      "coverURL": coverURL.asset->url,
      leftColumnTitle,
      leftColumnDescription
    },
    "events": *[_type == "event" && level2Category._ref == ^._id] | order(startDate desc){
      _id,
      title,
      description,
      startDate,
      endDate,
      "cover": cover.asset->url
    },
    "products": *[_type == "productItem" && level2Category._ref == ^._id] | order(sortOrder asc){
      _id,
      "slug": slug.current,
      title,
      tags,
      summary,
      description,
      materials,
      size,
      price,
      isEvent,
      isExpired,
      "thumbnail": coalesce(gallery[0].asset->url, "")
    }
  }
)
`;(0,s.groq)`
*[_type == "event"]{
  _id
}
`,(0,s.groq)`
*[_type == "event" && _id == $id][0]{
  _id,
  title,
  description,
  startDate,
  endDate,
  "cover": cover.asset->url
}
`;let u=(0,s.groq)`
*[_type == "platform"][0]{
  _id,
  platforms[]{
    _key,
    "logoUrl": logo.asset->url,
    "qrCodeUrl": qrCode.asset->url
  }
}
`;n()}catch(e){n(e)}})},6801:(e,t,a)=>{"use strict";a.a(e,async(e,n)=>{try{a.d(t,{G:()=>l});var s=a(9728),r=e([s]);s=(r.then?(await r)():r)[0];let i="kno2j23t",o="production";i&&o||console.warn("Missing Sanity project configuration. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.");let l=i&&o?(0,s.createClient)({projectId:i,dataset:o,apiVersion:"2024-03-01",useCdn:!0,perspective:"published"}):null;n()}catch(e){n(e)}})},7910:e=>{"use strict";e.exports=require("stream")},8646:(e,t,a)=>{"use strict";a.a(e,async(e,n)=>{try{a.r(t),a.d(t,{default:()=>m,getStaticPaths:()=>_,getStaticProps:()=>g});var s=a(8732),r=a(9788),i=a.n(r),o=a(9464),l=a(8952),c=a(4178),d=a(2356),u=a(6801),h=e([c,u]);function m({langParam:e,languageKey:t,home:a,categories:n,platform:r}){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i(),{children:(0,s.jsx)("title",{children:"gallery瓦聞wauramoon"})}),(0,s.jsx)(l.A,{langParam:e,pathSegments:[],children:(0,s.jsx)(o.A,{sections:a.sections||[],language:t,langParam:e,categories:n,platform:r})})]})}[c,u]=h.then?(await h)():h;let _=async()=>({paths:Object.keys(d.lb).map(e=>({params:{lang:e}})),fallback:"blocking"}),g=async({params:e})=>{let t=(0,d.Iy)(e?.lang);if(!u.G)return{notFound:!0};let[a,n,s]=await Promise.all([u.G.fetch(c.Nt),u.G.fetch(c.d).catch(()=>[]),u.G.fetch(c.kz).catch(()=>null)]);if(!a)return{notFound:!0};let r=(0,d.K)(t);return{props:{langParam:t,languageKey:r,home:a,categories:n||[],platform:s||void 0},revalidate:60}};n()}catch(e){n(e)}})},8732:e=>{"use strict";e.exports=require("react/jsx-runtime")},8778:(e,t,a)=>{"use strict";a.a(e,async(e,n)=>{try{a.r(t),a.d(t,{config:()=>p,default:()=>h,getServerSideProps:()=>g,getStaticPaths:()=>_,getStaticProps:()=>m,reportWebVitals:()=>v,routeModule:()=>f,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>j,unstable_getStaticParams:()=>x,unstable_getStaticPaths:()=>b,unstable_getStaticProps:()=>S});var s=a(3885),r=a(237),i=a(1413),o=a(9616),l=a.n(o),c=a(2081),d=a(8646),u=e([d]);d=(u.then?(await u)():u)[0];let h=(0,i.M)(d,"default"),m=(0,i.M)(d,"getStaticProps"),_=(0,i.M)(d,"getStaticPaths"),g=(0,i.M)(d,"getServerSideProps"),p=(0,i.M)(d,"config"),v=(0,i.M)(d,"reportWebVitals"),S=(0,i.M)(d,"unstable_getStaticProps"),b=(0,i.M)(d,"unstable_getStaticPaths"),x=(0,i.M)(d,"unstable_getStaticParams"),y=(0,i.M)(d,"unstable_getServerProps"),j=(0,i.M)(d,"unstable_getServerSideProps"),f=new s.PagesRouteModule({definition:{kind:r.A.PAGES,page:"/[lang]",pathname:"/[lang]",bundlePath:"",filename:""},components:{App:c.default,Document:l()},userland:d});n()}catch(e){n(e)}})},8952:(e,t,a)=>{"use strict";a.d(t,{A:()=>s});var n=a(8732);function s({children:e,langParam:t}){return(0,n.jsx)("div",{className:`min-h-screen bg-waura-pink text-waura-brown ${"en"===t?"english":"chinese"}`,children:(0,n.jsx)("main",{children:e})})}},9001:()=>{},9021:e=>{"use strict";e.exports=require("fs")},9071:(e,t,a)=>{"use strict";a.d(t,{Oi:()=>r,Sh:()=>i,iV:()=>s});let n=["zhHans","zhHant","en"];function s(e,t){if(!e)return"";if(e[t])return e[t];for(let t of n)if(e[t])return e[t];return""}function r(e,t){if(!e)return[];if(e[t])return e[t];for(let t of n)if(e[t])return e[t];return[]}function i(e,t){if(!e)return"";if(e[t])return e[t];for(let t of n)if(e[t])return e[t];return""}},9283:e=>{e.exports={container:"HomeSections_container__T_lNG",heroSection:"HomeSections_heroSection__Dqrki",heroContainer:"HomeSections_heroContainer__cAWPU",heroImageWrapper:"HomeSections_heroImageWrapper__3lJp0",heroImage:"HomeSections_heroImage__wqGGo",heroContent:"HomeSections_heroContent___XSbT",languageSwitcher:"HomeSections_languageSwitcher__MjCxy",languageLink:"HomeSections_languageLink__FJTSm",languageLinkActive:"HomeSections_languageLinkActive__p2g2Q",languageSeparator:"HomeSections_languageSeparator__aqvtl",brandContainer:"HomeSections_brandContainer__bhGYt",brandTitle:"HomeSections_brandTitle__NQKHt",brandSubtitle:"HomeSections_brandSubtitle___nUBb",brandStar:"HomeSections_brandStar__TpQyn",brandName:"HomeSections_brandName__uI3w1",brandEyebrow:"HomeSections_brandEyebrow__N_Igz",quoteSection:"HomeSections_quoteSection__d_lwC",quoteContainer:"HomeSections_quoteContainer__83kL5",quoteText:"HomeSections_quoteText__lHUNf",quoteAuthor:"HomeSections_quoteAuthor__7l59o",aboutSection:"HomeSections_aboutSection__1oiHQ",aboutContainer:"HomeSections_aboutContainer__jTaaS",aboutContent:"HomeSections_aboutContent___ix20",aboutSignature:"HomeSections_aboutSignature__lvQy_",aboutSignatureLine:"HomeSections_aboutSignatureLine__9U2Vy",aboutSignatureText:"HomeSections_aboutSignatureText__kW_ZU",channelGridSection:"HomeSections_channelGridSection__nRGhW",channelGridDescription:"HomeSections_channelGridDescription__KSXfp",channelGridContainer:"HomeSections_channelGridContainer__maXYR",channelGrid:"HomeSections_channelGrid__woCtV",channelItem:"HomeSections_channelItem___odpV",channelItemLarge:"HomeSections_channelItemLarge__dRO25",channelIcon:"HomeSections_channelIcon__CFhLw",channelIconLarge:"HomeSections_channelIconLarge___0A2h",channelLabel:"HomeSections_channelLabel__XdF2h",channelLabelContainer:"HomeSections_channelLabelContainer__QyF_s",channelStar:"HomeSections_channelStar__u_cso",channelTag:"HomeSections_channelTag__EjHk9",channelDescription:"HomeSections_channelDescription__2fNdw",contactSection:"HomeSections_contactSection__3HAXB",contactContainer:"HomeSections_contactContainer__7odS5",contactList:"HomeSections_contactList__UyTmg",contactItem:"HomeSections_contactItem__kkvqs",contactStudioName:"HomeSections_contactStudioName__1wRvB",contactLabel:"HomeSections_contactLabel__n0V1p",contactNotes:"HomeSections_contactNotes___hwns",contactPlatforms:"HomeSections_contactPlatforms__roU3D",platformItem:"HomeSections_platformItem__XZAA0",platformLogoWrapper:"HomeSections_platformLogoWrapper__V4GHy",platformLogo:"HomeSections_platformLogo__B_Qjd",platformQrCode:"HomeSections_platformQrCode__R6SMl",platformQrCodeActive:"HomeSections_platformQrCodeActive__1s7wG",qrCodeImage:"HomeSections_qrCodeImage__00Oin",imageSection:"HomeSections_imageSection__sSGii",imageContainer:"HomeSections_imageContainer__cr2hp",imageModuleImage:"HomeSections_imageModuleImage__Kdj5P",english:"HomeSections_english__UceHM",chinese:"HomeSections_chinese__aZo2z"}},9464:(e,t,a)=>{"use strict";a.d(t,{A:()=>m});var n=a(8732),s=a(6761),r=a.n(s),i=a(9918),o=a.n(i),l=a(2015),c=a(9071),d=a(2356),u=a(9283),h=a.n(u);function m({sections:e,language:t,langParam:a,categories:s,platform:r}){return(0,n.jsx)("div",{className:h().container,children:e.map(e=>{switch(e._type){case"heroModule":return(0,n.jsx)(_,{section:e,language:t,langParam:a},e._key);case"quoteModule":return(0,n.jsx)(g,{section:e,language:t},e._key);case"aboutModule":return(0,n.jsx)(p,{section:e,language:t},e._key);case"channelGridModule":return(0,n.jsx)(v,{section:e,language:t,langParam:a,categories:s},e._key);case"contactModule":return(0,n.jsx)(S,{section:e,language:t,platform:r},e._key);case"imageModule":return(0,n.jsx)(b,{section:e,language:t},e._key);default:return null}})})}function _({section:e,language:t,langParam:a}){let s=(0,c.iV)(e.title,t),i=a||"zh-hans";return(0,n.jsx)("section",{className:h().heroSection,children:(0,n.jsxs)("div",{className:h().heroContainer,children:[e.backgroundImage?(0,n.jsx)("div",{className:h().heroImageWrapper,children:(0,n.jsx)(r(),{src:e.backgroundImage,alt:s||"hero",width:0,height:0,sizes:"100vw",style:{width:"100%",height:"auto"}})}):null,(0,n.jsxs)("div",{className:h().heroContent,children:[(0,n.jsx)("div",{className:h().languageSwitcher,children:d.mN.map((e,t)=>(0,n.jsxs)("span",{children:[(0,n.jsx)(o(),{href:(0,d.u_)(e.param,[]),className:`${h().languageLink} ${i===e.param?h().languageLinkActive:""}`,children:e.label}),t<d.mN.length-1&&(0,n.jsx)("span",{className:h().languageSeparator,children:"★"})]},e.param))}),s&&(0,n.jsxs)("div",{className:h().brandContainer,children:[(0,n.jsx)("h1",{className:h().brandTitle,children:s}),(0,n.jsxs)("div",{className:h().brandSubtitle,children:[(0,n.jsx)("span",{className:h().brandStar,children:"★"}),(0,n.jsx)("span",{className:h().brandName,children:"wauramoon"})]})]})]})]})})}function g({section:e,language:t}){let a=(0,c.Oi)(e.quote,t),s={zhHans:"<p>“美是永生揽镜自照，但你就是永生，你也是镜子”</p>",zhHant:"<p>“美是永生攬鏡自照，但你就是永生，你也是鏡子”</p>",en:`<p>"Beauty is eternity gazing at itself in a mirror. <br/>
      &nbsp;But you are eternity and you are the mirror."</p>`},r={zhHans:"纪伯伦，《先知\xb7论美》",zhHant:"紀伯倫，《先知\xb7論美》",en:"Kahlil Gibran, 《The Prophet \xb7 On Beauty》"},i=s[t]||s.zhHans,o=r[t]||r.zhHans;return a&&0!==a.length?(0,n.jsx)("section",{className:h().quoteSection,children:(0,n.jsxs)("div",{className:h().quoteContainer,children:[(0,n.jsx)("div",{className:h().quoteText,dangerouslySetInnerHTML:{__html:i}}),(0,n.jsx)("span",{className:h().quoteAuthor,children:o})]})}):null}function p({language:e}){let t={zhHans:['瓦闻的伊始，源于我对中古手作器物的热爱，对"无心之美"的好奇探寻与粗浅实践。我喜欢器物在实用之外偶尔流露出的本真&#58;当它们融入生活，会呈现出一种沉浸于日常又超然其上的美，它朦胧、生动、耐读。这种不刻意、不完美的特质，如自然般坦然，不带批判地审视着我们也被我们审视。',"如今，瓦闻不只汇集国内外手作器物，也逐渐成长为一个美学发生的角落。我们以陶艺为原点，联结相近气息的创作者，通过茶、花、音乐、书画、空间等方式，将这份美感编织进当下生活。我们也希望通过设计与服务，将这种观看日常的视角，轻盈地传递给更多追求多元美感的个体。"],zhHant:['瓦聞的伊始，源於我對中古手作器物的熱愛，對"無心之美"的好奇探尋與粗淺實踐。我喜歡器物在實用之外偶爾流露出的本真&#58;當它們融入生活，會呈現出一種沉浸於日常又超然其上的美，它朦朧、生動、耐讀。這種不刻意、不完美的特質，如自然般坦然，不帶批判地審視著我們也被我們審視。',"如今，瓦聞不只匯集國內外手作器物，也逐漸成長為一個美學發生的角落。我們以陶藝為原點，聯結相近氣息的創作者，通過茶、花、音樂、書畫、空間等方式，將這份美感編織進當下生活。我們也希望通過設計與服務，將這種觀看日常的視角，輕盈地傳遞給更多追求多元美感的個體。"],en:['The beginning of wauramoon stems from my love for antique handmade objects and my curious exploration and humble practice of "unintentional beauty." I appreciate the authenticity that objects occasionally reveal beyond their utility—when they integrate into life, they present a beauty that is immersed in the everyday yet transcendent, hazy, vivid, and enduring. This unforced, imperfect quality, as natural as nature itself, observes us without judgment, just as we observe it.',"Today, wauramoon not only gathers handmade objects from home and abroad but has also gradually grown into a corner where aesthetics emerge. We take ceramics as our starting point, connecting creators with similar sensibilities, weaving this sense of beauty into contemporary life through tea, flowers, music, calligraphy, painting, and space. We also hope to gently pass on this perspective of viewing daily life to more individuals seeking diverse aesthetics through design and service."]},a={zhHans:"(主理人)张蕾",zhHant:"(主理人)張蕾",en:"(Curator) Zhang Lei"},s=t[e]||t.zhHans,r=a[e]||a.zhHans;return(0,n.jsx)("section",{className:h().aboutSection,children:(0,n.jsxs)("div",{className:h().aboutContainer,children:[(0,n.jsx)("div",{className:h().aboutContent,children:s.map((e,t)=>(0,n.jsx)("p",{dangerouslySetInnerHTML:{__html:e}},t))}),(0,n.jsx)("div",{className:h().aboutSignature,children:(0,n.jsx)("p",{className:h().aboutSignatureText,dangerouslySetInnerHTML:{__html:r}})})]})})}function v({section:e,language:t,langParam:a,categories:s}){if(s&&s.length>0){let e=a||"zh-hans";return(0,n.jsxs)("section",{className:h().channelGridSection,children:[(0,n.jsx)("div",{className:h().channelGridContainer,children:(0,n.jsx)("div",{className:h().channelGrid,children:s.map(a=>(0,n.jsxs)(o(),{href:`/${e}/category/${a._id}`,className:h().channelItem,children:[a.coverURL?(0,n.jsx)("div",{className:h().channelIcon,children:(0,n.jsx)(r(),{src:a.coverURL,alt:(0,c.iV)(a.label,t)||"",fill:!0,className:"object-cover",sizes:"80px"})}):null,(0,n.jsxs)("div",{className:h().channelLabelContainer,children:[a.tags&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{className:h().channelTag,children:(0,c.iV)(a.tags,t)}),(0,n.jsx)("span",{className:h().channelStar,children:"★"})]}),(0,n.jsx)("p",{className:h().channelLabel,children:(0,c.iV)(a.label,t)})]})]},a._id))})}),(0,n.jsxs)("div",{className:h().channelGridDescription,children:["zhHans"===t&&"*图标设计截取自劳伦\xb7科里的插画","zhHant"===t&&"*圖標設計截取自勞倫\xb7科里的插畫","en"===t&&"*Icon design excerpted from Lauren Corey's illustration"]})]})}if(!e.items?.length)return null;let i=e.items.slice(0,3),l=e.items.slice(3,5);return(0,n.jsx)("section",{className:h().channelGridSection,children:(0,n.jsxs)("div",{className:h().channelGridContainer,children:[i.length>0&&(0,n.jsx)("div",{className:h().channelGridTop,children:i.map(e=>(0,n.jsxs)("div",{className:h().channelItem,children:[e.iconUrl?(0,n.jsx)("div",{className:h().channelIcon,children:(0,n.jsx)(r(),{src:e.iconUrl,alt:(0,c.iV)(e.label,t)||"",fill:!0,className:"object-contain",sizes:"80px"})}):null,(0,n.jsx)("p",{className:h().channelLabel,children:(0,c.iV)(e.label,t)}),e.description&&(0,n.jsx)("p",{className:h().channelDescription,children:(0,c.iV)(e.description,t)})]},e._key))}),l.length>0&&(0,n.jsx)("div",{className:h().channelGridBottom,children:l.map((e,a)=>(0,n.jsxs)("div",{className:`${h().channelItem} ${0===a?h().channelItemLarge:""}`,children:[e.iconUrl?(0,n.jsx)("div",{className:0===a?h().channelIconLarge:h().channelIcon,children:(0,n.jsx)(r(),{src:e.iconUrl,alt:(0,c.iV)(e.label,t)||"",fill:!0,className:"object-contain",sizes:0===a?"96px":"80px"})}):null,(0,n.jsx)("p",{className:h().channelLabel,children:(0,c.iV)(e.label,t)}),e.description&&(0,n.jsx)("p",{className:h().channelDescription,children:(0,c.iV)(e.description,t)})]},e._key))})]})})}function S({section:e,language:t,platform:a}){let s=(0,c.iV)(e.studioName,t),i=(0,c.iV)(e.address,t),o=(0,c.iV)(e.businessHours,t),d=(0,c.iV)(e.notes,t),u=a?.platforms||[],[m,_]=(0,l.useState)(null);return(0,n.jsx)("section",{className:h().contactSection,children:(0,n.jsx)("div",{className:h().contactContainer,children:(0,n.jsxs)("div",{className:h().contactList,children:[s&&(0,n.jsx)("div",{className:h().contactItem,children:(0,n.jsx)("p",{className:h().contactStudioName,children:s})}),i&&(0,n.jsxs)("div",{className:h().contactItem,children:[(0,n.jsxs)("p",{className:h().contactLabel,children:["zhHans"===t&&"地址:","zhHant"===t&&"地址:","en"===t&&"Address:"]}),(0,n.jsx)("p",{children:i})]}),e.phone&&(0,n.jsxs)("div",{className:h().contactItem,children:[(0,n.jsxs)("p",{className:h().contactLabel,children:["zhHans"===t&&"电话:","zhHant"===t&&"電話:","en"===t&&"Tel:"]}),(0,n.jsxs)("p",{children:[e.phone,e.mobile?` / ${e.mobile}`:""]})]}),e.email&&(0,n.jsxs)("div",{className:h().contactItem,children:[(0,n.jsxs)("p",{className:h().contactLabel,children:["zhHans"===t&&"邮箱:","zhHant"===t&&"郵箱:","en"===t&&"Email:"]}),(0,n.jsx)("p",{children:e.email})]}),o&&(0,n.jsxs)("div",{className:h().contactItem,children:[(0,n.jsxs)("p",{className:h().contactLabel,children:["zhHans"===t&&"营业时间:","zhHant"===t&&"營業時間:","en"===t&&"Business Hours:"]}),(0,n.jsx)("p",{children:o})]}),d&&(0,n.jsxs)("div",{className:h().contactItem,children:[(0,n.jsx)("p",{className:h().contactLabel}),(0,n.jsx)("p",{children:d})]}),u.length>0&&(0,n.jsx)("div",{className:h().contactPlatforms,children:u.map(e=>(0,n.jsx)("div",{className:h().platformItem,children:e.logoUrl&&(0,n.jsxs)("div",{className:h().platformLogoWrapper,onClick:()=>_(t=>t===e._key?null:e._key),children:[(0,n.jsx)(r(),{src:e.logoUrl,alt:"zhHans"===t||"zhHant"===t?"平台 Logo":"Platform Logo",width:30,height:30,className:h().platformLogo}),e.qrCodeUrl&&(0,n.jsx)("div",{className:`${h().platformQrCode} ${m===e._key?h().platformQrCodeActive:""}`,children:(0,n.jsx)(r(),{src:e.qrCodeUrl,alt:"zhHans"===t?"二维码":"zhHant"===t?"二維碼":"QR Code",width:200,height:200,className:h().qrCodeImage})})]})},e._key))})]})})})}function b({section:e,language:t}){let a=(0,c.Sh)(e.image,t),s=(0,c.iV)(e.alt,t);return a?(0,n.jsx)("section",{className:h().imageSection,children:(0,n.jsx)("div",{className:h().imageContainer,children:(0,n.jsx)(r(),{src:a,alt:s||"",width:0,height:0,sizes:"100vw",style:{width:"100%",height:"auto"},className:h().imageModuleImage})})}):null}},9728:e=>{"use strict";e.exports=import("next-sanity")}};var t=require("../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),n=t.X(0,[89,190,616,358,761],()=>a(8778));module.exports=n})();