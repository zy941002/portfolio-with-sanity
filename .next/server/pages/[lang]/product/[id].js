(()=>{var e={};e.id=842,e.ids=[220,636,842],e.modules={361:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},474:e=>{"use strict";e.exports=import("swiper/react")},1872:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{A:()=>c});var i=r(8732),l=r(9602),s=e([l]);function n(e){return({left:"text-left",center:"text-center",right:"text-right",justify:"text-justify"})[e||"left"]||"text-left"}function o(e){if(e&&"object"==typeof e){if(e.markDefs&&Array.isArray(e.markDefs)){let t=e.markDefs.find(e=>"textAlign"===e._type);if(t&&"align"in t)return t.align}if(e.children&&Array.isArray(e.children)){for(let t of e.children)if(t.marks&&Array.isArray(t.marks)){if(t.marks.includes("textAlignLeft"))return"left";if(t.marks.includes("textAlignCenter"))return"center";if(t.marks.includes("textAlignRight"))return"right";if(t.marks.includes("textAlignJustify"))return"justify";if(t.marks.includes("textAlign")&&e.markDefs&&Array.isArray(e.markDefs)){let t=e.markDefs.find(e=>"textAlign"===e._type);if(t&&"align"in t)return t.align}}}}}l=(s.then?(await s)():s)[0];let d={block:{normal:({children:e,value:t})=>{let r=o(t),a=n(r);return(0,i.jsx)("p",{className:`leading-relaxed tracking-wide mb-4 ${a}`,children:e})},h1:({children:e,value:t})=>{let r=o(t),a=n(r);return(0,i.jsx)("h1",{className:`text-3xl font-bold mb-4 ${a}`,children:e})},h2:({children:e,value:t})=>{let r=o(t),a=n(r);return(0,i.jsx)("h2",{className:`text-2xl font-bold mb-4 ${a}`,children:e})},h3:({children:e,value:t})=>{let r=o(t),a=n(r);return(0,i.jsx)("h3",{className:`text-xl font-bold mb-4 ${a}`,children:e})},blockquote:({children:e,value:t})=>{let r=o(t),a=n(r);return(0,i.jsx)("blockquote",{className:`border-l-4 border-gray-300 pl-4 italic mb-4 ${a}`,children:e})}},marks:{textAlign:({children:e})=>(0,i.jsx)(i.Fragment,{children:e}),textAlignLeft:({children:e})=>(0,i.jsx)(i.Fragment,{children:e}),textAlignCenter:({children:e})=>(0,i.jsx)(i.Fragment,{children:e}),textAlignRight:({children:e})=>(0,i.jsx)(i.Fragment,{children:e}),textAlignJustify:({children:e})=>(0,i.jsx)(i.Fragment,{children:e})}};function c({value:e,className:t}){return e&&0!==e.length?(0,i.jsx)("div",{className:t,children:(0,i.jsx)(l.PortableText,{value:e,components:d})}):null}a()}catch(e){a(e)}})},2015:e=>{"use strict";e.exports=require("react")},2081:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(8732);r(9001);var i=r(9788),l=r.n(i),s=r(2015),n=r(4233);function o({Component:e,pageProps:t}){(0,n.useRouter)();let[r,i]=(0,s.useState)(!1);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(l(),{children:[(0,a.jsx)("title",{children:"gallery瓦聞"}),(0,a.jsx)("meta",{name:"description",content:"gallery瓦聞"}),(0,a.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,a.jsx)("link",{rel:"preload",href:"/fonts/方正兰亭黑_GBK.woff2",as:"font",type:"font/woff2",crossOrigin:"anonymous"})]}),(0,a.jsx)("div",{className:`page-transition-wrapper ${r?"transitioning":""}`,children:(0,a.jsx)(e,{...t})})]})}},2326:e=>{"use strict";e.exports=require("react-dom")},2356:(e,t,r)=>{"use strict";r.d(t,{Iy:()=>n,K:()=>s,lb:()=>a,mN:()=>i,u_:()=>o});let a={"zh-hans":"zhHans","zh-hant":"zhHant",en:"en"},i=[{param:"en",label:"En"},{param:"zh-hans",label:"中文简体"},{param:"zh-hant",label:"中文繁體"}],l="zh-hans";function s(e){let t=Array.isArray(e)?e[0]:e;return t&&t in a?a[t]:a[l]}function n(e){let t=Array.isArray(e)?e[0]:e;return t&&t in a?t:l}function o(e,t){let r=t.filter(Boolean).join("/");return`/${e}${r?`/${r}`:""}`}},2703:()=>{},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},4075:e=>{"use strict";e.exports=require("zlib")},4177:()=>{},4178:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{Nt:()=>s,d:()=>n,kz:()=>u,ml:()=>o,ri:()=>c,uP:()=>d});var i=r(9728),l=e([i]);i=(l.then?(await l)():l)[0];let s=(0,i.groq)`
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
`;(0,i.groq)`
*[_type in ["productCategory", "productCategoryLevel2"]]{
  _id
}
`;let n=(0,i.groq)`
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
`,o=(0,i.groq)`
*[_type == "productItem"]{
  _id
}
`,c=(0,i.groq)`
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
`,d=(0,i.groq)`
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
`;(0,i.groq)`
*[_type == "event"]{
  _id
}
`,(0,i.groq)`
*[_type == "event" && _id == $id][0]{
  _id,
  title,
  description,
  startDate,
  endDate,
  "cover": cover.asset->url
}
`;let u=(0,i.groq)`
*[_type == "platform"][0]{
  _id,
  platforms[]{
    _key,
    "logoUrl": logo.asset->url,
    "qrCodeUrl": qrCode.asset->url
  }
}
`;a()}catch(e){a(e)}})},4469:()=>{},5388:e=>{e.exports={section:"ProductView_section__VUJsZ",container:"ProductView_container__lc1g4",flexContainer:"ProductView_flexContainer__9FMtF",aside:"ProductView_aside__tpDes",coverImageSection:"ProductView_coverImageSection__b97yu",descriptionSection:"ProductView_descriptionSection__0V4AU",coverImageWrapper:"ProductView_coverImageWrapper__0Yh_i",titleSection:"ProductView_titleSection__w0KM2",columnTitle:"ProductView_columnTitle__Xfurn",mainTitle:"ProductView_mainTitle__cRcMI",summary:"ProductView_summary__KGYsC",description:"ProductView_description__tz6qF",productInfo:"ProductView_productInfo__bubcI",infoItem:"ProductView_infoItem__BexNY",infoLabel:"ProductView_infoLabel__KjXWX",infoValue:"ProductView_infoValue__PkROo",price:"ProductView_price__GxGg_",content:"ProductView_content__7iX4e",mainContent:"ProductView_mainContent__d5ub1",gallery:"ProductView_gallery__gvlev",gallerySwiper:"ProductView_gallerySwiper__xyrrp",galleryItem:"ProductView_galleryItem__10g0X",galleryImageWrapper:"ProductView_galleryImageWrapper__B5UTL",galleryItemVideo:"ProductView_galleryItemVideo__YRvli",videoWrapper:"ProductView_videoWrapper__tmlO4",breadcrumb:"ProductView_breadcrumb__8QYZY",breadcrumbLink:"ProductView_breadcrumbLink__hak41",breadcrumbActive:"ProductView_breadcrumbActive__HkMll",breadcrumbSegment:"ProductView_breadcrumbSegment__MAcTh",breadcrumbSeparator:"ProductView_breadcrumbSeparator__43R6g",contactPlatformsDesktop:"ProductView_contactPlatformsDesktop__JYPhk",contactPlatformsMobile:"ProductView_contactPlatformsMobile__mn6Zb",platformItem:"ProductView_platformItem__EAZao",platformLogoWrapper:"ProductView_platformLogoWrapper__HPADU",platformLogo:"ProductView_platformLogo___EzmM",contactTitleWrapper:"ProductView_contactTitleWrapper__hTOmu",contactTitle:"ProductView_contactTitle__P8uYt",qrCodesContainer:"ProductView_qrCodesContainer__P3CbR",qrCodeWrapper:"ProductView_qrCodeWrapper__hB3FA",qrCodeImage:"ProductView_qrCodeImage__aivqE"}},6145:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{A:()=>v});var i=r(8732),l=r(6761),s=r.n(l),n=r(9918),o=r.n(n),c=r(1872),d=r(9071),u=r(474),m=r(7508);r(4177),r(4469),r(2703);var p=r(5388),g=r.n(p),h=r(6220),_=e([c,u,m]);function v({product:e,language:t,langParam:r,platform:a}){let l=(0,d.iV)(e.title,t),n=(0,d.iV)(e.summary,t),o=(0,d.Oi)(e.description,t),p=(0,d.iV)(e.materials,t),h=(0,d.iV)(e.size,t),_=e.level1Category,v=e.level2Category,x=!!(e.videoUrl||e.videoLink),y=e.thumbnail||(e.gallery&&e.gallery.length>0?e.gallery[0]:null),b=!!e.thumbnail,j=!x&&e.gallery&&e.gallery.length>0?b?e.gallery:e.gallery.slice(1):[];return(0,i.jsx)("section",{className:g().section,children:(0,i.jsx)("div",{className:g().container,children:(0,i.jsxs)("div",{className:g().flexContainer,children:[(0,i.jsxs)("aside",{className:g().aside,children:[(0,i.jsxs)("div",{className:g().coverImageSection,children:[y?(0,i.jsx)("div",{className:g().coverImageWrapper,children:(0,i.jsx)(s(),{src:y,alt:l||"",fill:!0,className:"object-cover",sizes:"(max-width: 768px) 100vw, 40vw"})}):null,(0,i.jsxs)("div",{className:g().titleSection,children:[(0,i.jsx)("h1",{className:g().mainTitle,children:l}),n&&(0,i.jsx)("p",{className:g().summary,children:n})]})]}),(0,i.jsxs)("div",{className:g().descriptionSection,children:[o&&(0,i.jsx)(c.A,{value:o,className:g().description}),(0,i.jsxs)("div",{className:g().productInfo,children:[p&&(0,i.jsxs)("div",{className:g().infoItem,children:[(0,i.jsxs)("p",{className:g().infoLabel,children:["zhHans"===t&&"材质","zhHant"===t&&"材質","en"===t&&"Materials"]}),(0,i.jsx)("p",{className:g().infoValue,children:p})]}),h&&(0,i.jsxs)("div",{className:g().infoItem,children:[(0,i.jsxs)("p",{className:g().infoLabel,children:["zhHans"===t&&"尺寸","zhHant"===t&&"尺寸","en"===t&&"Size"]}),(0,i.jsx)("p",{className:g().infoValue,children:h})]}),e.price&&(0,i.jsxs)("div",{className:g().infoItem,children:[(0,i.jsxs)("p",{className:g().infoLabel,children:["zhHans"===t&&"价格","zhHant"===t&&"價格","en"===t&&"Price"]}),(0,i.jsx)("p",{className:g().price,children:e.price})]})]})]}),a?.platforms&&a.platforms.length>0&&(0,i.jsx)("div",{className:g().contactPlatformsDesktop,children:a.platforms.map(e=>(0,i.jsx)("div",{className:g().platformItem,children:e.logoUrl&&(0,i.jsx)("div",{className:g().platformLogoWrapper,onClick:()=>{e.qrCodeUrl&&window.open(e.qrCodeUrl,"_blank")},children:(0,i.jsx)(s(),{src:e.logoUrl,alt:"zhHans"===t||"zhHant"===t?"平台 Logo":"Platform Logo",width:30,height:30,className:g().platformLogo})})},e._key))})]}),(0,i.jsxs)("div",{className:g().content,children:[(0,i.jsx)(f,{product:e,level1Category:_,level2Category:v,langParam:r,language:t}),(0,i.jsx)("div",{className:g().mainContent,children:(0,i.jsx)("div",{className:g().gallery,children:x?(0,i.jsx)("div",{className:g().galleryItemVideo,children:(0,i.jsx)("div",{className:g().videoWrapper,children:e.videoUrl?(0,i.jsx)("video",{src:e.videoUrl,controls:!0,className:"w-full h-full object-contain",playsInline:!0,children:"zhHans"===t?"您的浏览器不支持视频播放":"zhHant"===t?"您的瀏覽器不支持視頻播放":"Your browser does not support video playback"}):e.videoLink?(0,i.jsx)("iframe",{src:function(e){if(!e)return"";let t=e.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);if(t)return`https://www.youtube.com/embed/${t[1]}`;let r=e.match(/(?:vimeo\.com\/)(?:.*\/)?(\d+)/);return r?`https://player.vimeo.com/video/${r[1]}`:e}(e.videoLink),className:"w-full h-full",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,title:l||"Product video"}):null})}):j.length>0?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"custom-nav-prev",style:{zIndex:999,cursor:"pointer"},children:(0,i.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{d:"M15 18L9 12L15 6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,i.jsx)(u.Swiper,{modules:[m.Navigation,m.Pagination,m.Autoplay],spaceBetween:20,slidesPerView:1,navigation:{enabled:!0,nextEl:".custom-nav-next",prevEl:".custom-nav-prev"},autoplay:{delay:3e3,disableOnInteraction:!1},loop:!0,pagination:{clickable:!0},className:g().gallerySwiper,children:j.map((e,t)=>(0,i.jsx)(u.SwiperSlide,{children:(0,i.jsx)("div",{className:g().galleryItem,children:(0,i.jsx)("div",{className:g().galleryImageWrapper,children:(0,i.jsx)(s(),{src:e,alt:l?`${l} - ${t+1}`:`Product image ${t+1}`,fill:!0,className:"object-contain",sizes:"(max-width: 768px) 100vw, 70vw"})})})},t))}),(0,i.jsx)("div",{className:"custom-nav-next",style:{zIndex:999,cursor:"pointer"},children:(0,i.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{d:"M9 18L15 12L9 6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]}):(0,i.jsx)("div",{className:g().galleryItem,children:(0,i.jsx)("div",{className:"absolute inset-0 flex items-center justify-center text-waura-deep-gray",children:"zhHans"===t?"暂无图片":"zhHant"===t?"暫無圖片":"No image available"})})})}),a?.platforms&&a.platforms.length>0&&(0,i.jsx)("div",{className:g().contactPlatformsMobile,children:a.platforms.map(e=>(0,i.jsx)("div",{className:g().platformItem,children:e.logoUrl&&(0,i.jsx)("div",{className:g().platformLogoWrapper,onClick:()=>{e.qrCodeUrl&&window.open(e.qrCodeUrl,"_blank")},children:(0,i.jsx)(s(),{src:e.logoUrl,alt:"zhHans"===t||"zhHant"===t?"平台 Logo":"Platform Logo",width:30,height:30,className:g().platformLogo})})},e._key))})]})]})})})}function f({product:e,level1Category:t,level2Category:r,langParam:a,language:l}){let s=[];t&&s.push({label:(0,d.iV)(t.title,l),id:t._id}),r&&s.push({label:(0,d.iV)(r.title,l),id:r._id}),s.push({label:(0,d.iV)(e.title,l)});let n=(0,h.useSearchParams)().get("parent");return(0,i.jsxs)("nav",{className:g().breadcrumb,children:[(0,i.jsxs)(o(),{href:`/${a}`,className:g().breadcrumbLink,children:["zhHans"===l&&"首页","zhHant"===l&&"首頁","en"===l&&"Home"]}),s.map((e,t)=>(0,i.jsxs)("span",{className:g().breadcrumbSegment,children:[(0,i.jsx)("span",{className:g().breadcrumbSeparator,children:"/"}),e.id?(0,i.jsx)(o(),{href:`/${a}/category/${e.id}?parent=${n}`,className:t===s.length-1?g().breadcrumbActive:g().breadcrumbLink,children:e.label}):(0,i.jsx)("span",{className:g().breadcrumbActive,children:e.label})]},e.id||t))]})}[c,u,m]=_.then?(await _)():_,a()}catch(e){a(e)}})},6801:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{G:()=>o});var i=r(9728),l=e([i]);i=(l.then?(await l)():l)[0];let s="kno2j23t",n="production";s&&n||console.warn("Missing Sanity project configuration. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.");let o=s&&n?(0,i.createClient)({projectId:s,dataset:n,apiVersion:"2024-03-01",useCdn:!0,perspective:"published"}):null;a()}catch(e){a(e)}})},7508:e=>{"use strict";e.exports=import("swiper/modules")},7910:e=>{"use strict";e.exports=require("stream")},8437:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{config:()=>_,default:()=>m,getServerSideProps:()=>h,getStaticPaths:()=>g,getStaticProps:()=>p,reportWebVitals:()=>v,routeModule:()=>w,unstable_getServerProps:()=>b,unstable_getServerSideProps:()=>j,unstable_getStaticParams:()=>y,unstable_getStaticPaths:()=>x,unstable_getStaticProps:()=>f});var i=r(3885),l=r(237),s=r(1413),n=r(9616),o=r.n(n),c=r(2081),d=r(9289),u=e([d]);d=(u.then?(await u)():u)[0];let m=(0,s.M)(d,"default"),p=(0,s.M)(d,"getStaticProps"),g=(0,s.M)(d,"getStaticPaths"),h=(0,s.M)(d,"getServerSideProps"),_=(0,s.M)(d,"config"),v=(0,s.M)(d,"reportWebVitals"),f=(0,s.M)(d,"unstable_getStaticProps"),x=(0,s.M)(d,"unstable_getStaticPaths"),y=(0,s.M)(d,"unstable_getStaticParams"),b=(0,s.M)(d,"unstable_getServerProps"),j=(0,s.M)(d,"unstable_getServerSideProps"),w=new i.PagesRouteModule({definition:{kind:l.A.PAGES,page:"/[lang]/product/[id]",pathname:"/[lang]/product/[id]",bundlePath:"",filename:""},components:{App:c.default,Document:o()},userland:d});a()}catch(e){a(e)}})},8732:e=>{"use strict";e.exports=require("react/jsx-runtime")},8952:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var a=r(8732);function i({children:e,langParam:t}){return(0,a.jsx)("div",{className:`min-h-screen bg-waura-pink text-waura-brown ${"en"===t?"english":"chinese"}`,children:(0,a.jsx)("main",{children:e})})}},9001:()=>{},9021:e=>{"use strict";e.exports=require("fs")},9071:(e,t,r)=>{"use strict";r.d(t,{Oi:()=>l,Sh:()=>s,iV:()=>i});let a=["zhHans","zhHant","en"];function i(e,t){if(!e)return"";if(e[t])return e[t];for(let t of a)if(e[t])return e[t];return""}function l(e,t){if(!e)return[];if(e[t])return e[t];for(let t of a)if(e[t])return e[t];return[]}function s(e,t){if(!e)return"";if(e[t])return e[t];for(let t of a)if(e[t])return e[t];return""}},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9289:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{default:()=>g,getStaticPaths:()=>h,getStaticProps:()=>_});var i=r(8732),l=r(9788),s=r.n(l),n=r(6145),o=r(8952),c=r(4178),d=r(2356),u=r(6801),m=r(9071),p=e([n,c,u]);function g({langParam:e,languageKey:t,product:r,platform:a}){let l=(0,m.iV)(r.title,t),c=l?`${l} - gallery瓦聞`:"gallery瓦聞";return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s(),{children:(0,i.jsx)("title",{children:c})}),(0,i.jsx)(o.A,{langParam:e,pathSegments:["product",r._id||""],children:(0,i.jsx)(n.A,{product:r,language:t,langParam:e,platform:a})})]})}[n,c,u]=p.then?(await p)():p;let h=async()=>u.G?{paths:(await u.G.fetch(c.ml).catch(()=>[])).flatMap(({_id:e})=>Object.keys(d.lb).map(t=>({params:{lang:t,id:e}}))),fallback:"blocking"}:{paths:[],fallback:"blocking"},_=async({params:e})=>{let t=(0,d.Iy)(e?.lang),r=e?.id;if(!u.G||!r)return{notFound:!0};let[a,i]=await Promise.all([u.G.fetch(c.ri,{id:r}),u.G.fetch(c.kz).catch(()=>null)]);if(!a)return{notFound:!0};let l=(0,d.K)(t);return{props:{langParam:t,languageKey:l,product:a,id:r,platform:i||void 0},revalidate:60}};a()}catch(e){a(e)}})},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9602:e=>{"use strict";e.exports=import("@portabletext/react")},9728:e=>{"use strict";e.exports=import("next-sanity")}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[89,190,616,358,761,839],()=>r(8437));module.exports=a})();