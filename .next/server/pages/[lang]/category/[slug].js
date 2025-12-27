(()=>{var e={};e.id=733,e.ids=[220,636,733],e.modules={361:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},1872:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{A:()=>c});var l=r(8732),i=r(9602),s=e([i]);function n(e){return({left:"text-left",center:"text-center",right:"text-right",justify:"text-justify"})[e||"left"]||"text-left"}function o(e){if(e&&"object"==typeof e){if(e.markDefs&&Array.isArray(e.markDefs)){let t=e.markDefs.find(e=>"textAlign"===e._type);if(t&&"align"in t)return t.align}if(e.children&&Array.isArray(e.children)){for(let t of e.children)if(t.marks&&Array.isArray(t.marks)){if(t.marks.includes("textAlignLeft"))return"left";if(t.marks.includes("textAlignCenter"))return"center";if(t.marks.includes("textAlignRight"))return"right";if(t.marks.includes("textAlignJustify"))return"justify";if(t.marks.includes("textAlign")&&e.markDefs&&Array.isArray(e.markDefs)){let t=e.markDefs.find(e=>"textAlign"===e._type);if(t&&"align"in t)return t.align}}}}}i=(s.then?(await s)():s)[0];let d={block:{normal:({children:e,value:t})=>{let r=o(t),a=n(r);return(0,l.jsx)("p",{className:`leading-relaxed tracking-wide mb-4 ${a}`,children:e})},h1:({children:e,value:t})=>{let r=o(t),a=n(r);return(0,l.jsx)("h1",{className:`text-3xl font-bold mb-4 ${a}`,children:e})},h2:({children:e,value:t})=>{let r=o(t),a=n(r);return(0,l.jsx)("h2",{className:`text-2xl font-bold mb-4 ${a}`,children:e})},h3:({children:e,value:t})=>{let r=o(t),a=n(r);return(0,l.jsx)("h3",{className:`text-xl font-bold mb-4 ${a}`,children:e})},blockquote:({children:e,value:t})=>{let r=o(t),a=n(r);return(0,l.jsx)("blockquote",{className:`border-l-4 border-gray-300 pl-4 italic mb-4 ${a}`,children:e})}},marks:{textAlign:({children:e})=>(0,l.jsx)(l.Fragment,{children:e}),textAlignLeft:({children:e})=>(0,l.jsx)(l.Fragment,{children:e}),textAlignCenter:({children:e})=>(0,l.jsx)(l.Fragment,{children:e}),textAlignRight:({children:e})=>(0,l.jsx)(l.Fragment,{children:e}),textAlignJustify:({children:e})=>(0,l.jsx)(l.Fragment,{children:e})}};function c({value:e,className:t}){return e&&0!==e.length?(0,l.jsx)("div",{className:t,children:(0,l.jsx)(i.PortableText,{value:e,components:d})}):null}a()}catch(e){a(e)}})},2015:e=>{"use strict";e.exports=require("react")},2081:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var a=r(8732);r(9001);var l=r(9788),i=r.n(l),s=r(2015),n=r(4233);function o({Component:e,pageProps:t}){(0,n.useRouter)();let[r,l]=(0,s.useState)(!1);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(i(),{children:[(0,a.jsx)("title",{children:"gallery瓦聞"}),(0,a.jsx)("meta",{name:"description",content:"gallery瓦聞"}),(0,a.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,a.jsx)("link",{rel:"preload",href:"/fonts/方正兰亭黑_GBK.woff2",as:"font",type:"font/woff2",crossOrigin:"anonymous"})]}),(0,a.jsx)("div",{className:`page-transition-wrapper ${r?"transitioning":""}`,children:(0,a.jsx)(e,{...t})})]})}},2303:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{config:()=>v,default:()=>g,getServerSideProps:()=>m,getStaticPaths:()=>_,getStaticProps:()=>p,reportWebVitals:()=>f,routeModule:()=>w,unstable_getServerProps:()=>x,unstable_getServerSideProps:()=>b,unstable_getStaticParams:()=>C,unstable_getStaticPaths:()=>h,unstable_getStaticProps:()=>y});var l=r(3885),i=r(237),s=r(1413),n=r(9616),o=r.n(n),c=r(2081),d=r(8978),u=e([d]);d=(u.then?(await u)():u)[0];let g=(0,s.M)(d,"default"),p=(0,s.M)(d,"getStaticProps"),_=(0,s.M)(d,"getStaticPaths"),m=(0,s.M)(d,"getServerSideProps"),v=(0,s.M)(d,"config"),f=(0,s.M)(d,"reportWebVitals"),y=(0,s.M)(d,"unstable_getStaticProps"),h=(0,s.M)(d,"unstable_getStaticPaths"),C=(0,s.M)(d,"unstable_getStaticParams"),x=(0,s.M)(d,"unstable_getServerProps"),b=(0,s.M)(d,"unstable_getServerSideProps"),w=new l.PagesRouteModule({definition:{kind:i.A.PAGES,page:"/[lang]/category/[slug]",pathname:"/[lang]/category/[slug]",bundlePath:"",filename:""},components:{App:c.default,Document:o()},userland:d});a()}catch(e){a(e)}})},2326:e=>{"use strict";e.exports=require("react-dom")},2356:(e,t,r)=>{"use strict";r.d(t,{Iy:()=>n,K:()=>s,lb:()=>a,mN:()=>l,u_:()=>o});let a={"zh-hans":"zhHans","zh-hant":"zhHant",en:"en"},l=[{param:"en",label:"En"},{param:"zh-hans",label:"中文简体"},{param:"zh-hant",label:"中文繁體"}],i="zh-hans";function s(e){let t=Array.isArray(e)?e[0]:e;return t&&t in a?a[t]:a[i]}function n(e){let t=Array.isArray(e)?e[0]:e;return t&&t in a?t:i}function o(e,t){let r=t.filter(Boolean).join("/");return`/${e}${r?`/${r}`:""}`}},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3054:(e,t,r)=>{"use strict";function a(e){if(2!==e.level||!e.parent||!e.inheritFromParent)return e;let t=e.parent,r={...e,coverURL:e.coverURL||t.coverURL,leftColumnTitle:e.leftColumnTitle||t.leftColumnTitle,leftColumnDescription:e.leftColumnDescription||t.leftColumnDescription,relatedEvents:e.relatedEvents&&e.relatedEvents.length>0?e.relatedEvents:t.relatedEvents||e.relatedEvents,featuredProducts:e.featuredProducts&&e.featuredProducts.length>0?e.featuredProducts:t.featuredProducts||e.featuredProducts};return r.children&&(r.children=r.children.map(e=>2===e.level&&e.inheritFromParent&&e.parent?{...e,coverURL:e.coverURL||e.parent.coverURL,leftColumnTitle:e.leftColumnTitle||e.parent.leftColumnTitle,leftColumnDescription:e.leftColumnDescription||e.parent.leftColumnDescription}:e)),r}r.d(t,{R:()=>a})},3398:e=>{e.exports={container:"CategoryView_container__KIJvR",flexContainer:"CategoryView_flexContainer__olRSI",aside:"CategoryView_aside__9INMG",coverImageSection:"CategoryView_coverImageSection__D0_nd",descriptionSection:"CategoryView_descriptionSection__bIKFU",coverImageWrapper:"CategoryView_coverImageWrapper__Ucpe9",titleSection:"CategoryView_titleSection__GDpfR",columnTitle:"CategoryView_columnTitle__0Iacv",mainTitle:"CategoryView_mainTitle__qam4a",subTitle:"CategoryView_subTitle___E_Aa",description:"CategoryView_description__v9bJz",eventsSectionDesktop:"CategoryView_eventsSectionDesktop__B9qMs",eventsSectionMobile:"CategoryView_eventsSectionMobile__Mo43_",eventsTitle:"CategoryView_eventsTitle__Smww_",eventsList:"CategoryView_eventsList__gyy4g",content:"CategoryView_content__OpQU_",mainContent:"CategoryView_mainContent__DIf0W",grid:"CategoryView_grid__aco7V",breadcrumb:"CategoryView_breadcrumb__ZOowz",breadcrumbLink:"CategoryView_breadcrumbLink__n21kM",breadcrumbActive:"CategoryView_breadcrumbActive__BerOt",breadcrumbSegment:"CategoryView_breadcrumbSegment__RTrAr",breadcrumbSeparator:"CategoryView_breadcrumbSeparator__S9wKR",categoryCard:"CategoryView_categoryCard__5_onq",categoryImageWrapper:"CategoryView_categoryImageWrapper__ScQP6",categoryTitle:"CategoryView_categoryTitle__Rga6b",productCard:"CategoryView_productCard___r7H1",productImageWrapper:"CategoryView_productImageWrapper__c_rco",productInfo:"CategoryView_productInfo__bDzl4",productTitle:"CategoryView_productTitle__n6QkU",productPrice:"CategoryView_productPrice__EkaYX",eventCard:"CategoryView_eventCard__pqCaO",eventCardSidebar:"CategoryView_eventCardSidebar__6WnnD",eventImageWrapper:"CategoryView_eventImageWrapper__2An8T",eventImageWrapperGrid:"CategoryView_eventImageWrapperGrid___PUOa",eventImageWrapperSidebar:"CategoryView_eventImageWrapperSidebar__BlCXh",eventInfo:"CategoryView_eventInfo__4GO0T",eventTitle:"CategoryView_eventTitle__yZgyg",eventTitleSidebar:"CategoryView_eventTitleSidebar__NsJ4Z",eventDate:"CategoryView_eventDate__efvmK",eventProductCard:"CategoryView_eventProductCard__uKQp_",eventProductImageWrapper:"CategoryView_eventProductImageWrapper__IpZ9H",eventProductInfo:"CategoryView_eventProductInfo__O6IuU",eventProductDescription:"CategoryView_eventProductDescription__4Lh5S",eventProductTags:"CategoryView_eventProductTags__rh1a1",eventProductTag:"CategoryView_eventProductTag__1qqMz",eventProductTagCenter:"CategoryView_eventProductTagCenter__o4_aN",tagSeparator:"CategoryView_tagSeparator__9xfP0",eventProductTitle:"CategoryView_eventProductTitle__hZatA",eventProductPrice:"CategoryView_eventProductPrice__TfCzw",placeholderCard:"CategoryView_placeholderCard__fKDIF",placeholderImageWrapper:"CategoryView_placeholderImageWrapper__tLepr",placeholderTitle:"CategoryView_placeholderTitle__a81aE",contactPlatformsDesktop:"CategoryView_contactPlatformsDesktop__XCAP8",contactPlatformsMobile:"CategoryView_contactPlatformsMobile__bUAvk",contactPlatformsRow:"CategoryView_contactPlatformsRow__JBvQ9",contactTitleWrapper:"CategoryView_contactTitleWrapper__1g_xm",contactTitle:"CategoryView_contactTitle__zgcRY",qrCodesContainer:"CategoryView_qrCodesContainer__Fa1vt",qrCodeWrapper:"CategoryView_qrCodeWrapper__mWij7",qrCodeImage:"CategoryView_qrCodeImage__5DLWK",platformsList:"CategoryView_platformsList__XE606",platformItem:"CategoryView_platformItem__4ksQ3",platformLogo:"CategoryView_platformLogo__5B2oq"}},3873:e=>{"use strict";e.exports=require("path")},4075:e=>{"use strict";e.exports=require("zlib")},4178:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{Nt:()=>s,d:()=>n,kz:()=>u,ml:()=>o,ri:()=>c,uP:()=>d});var l=r(9728),i=e([l]);l=(i.then?(await i)():i)[0];let s=(0,l.groq)`
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
`;(0,l.groq)`
*[_type in ["productCategory", "productCategoryLevel2"]]{
  _id
}
`;let n=(0,l.groq)`
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
`,o=(0,l.groq)`
*[_type == "productItem"]{
  _id
}
`,c=(0,l.groq)`
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
`,d=(0,l.groq)`
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
`;(0,l.groq)`
*[_type == "event"]{
  _id
}
`,(0,l.groq)`
*[_type == "event" && _id == $id][0]{
  _id,
  title,
  description,
  startDate,
  endDate,
  "cover": cover.asset->url
}
`;let u=(0,l.groq)`
*[_type == "platform"][0]{
  _id,
  platforms[]{
    _key,
    "logoUrl": logo.asset->url,
    "qrCodeUrl": qrCode.asset->url
  }
}
`;a()}catch(e){a(e)}})},6801:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{G:()=>o});var l=r(9728),i=e([l]);l=(i.then?(await i)():i)[0];let s="kno2j23t",n="production";s&&n||console.warn("Missing Sanity project configuration. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.");let o=s&&n?(0,l.createClient)({projectId:s,dataset:n,apiVersion:"2024-03-01",useCdn:!0,perspective:"published"}):null;a()}catch(e){a(e)}})},7910:e=>{"use strict";e.exports=require("stream")},8732:e=>{"use strict";e.exports=require("react/jsx-runtime")},8839:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{A:()=>m});var l=r(8732),i=r(6761),s=r.n(i),n=r(9918),o=r.n(n),c=r(1872),d=r(9071),u=r(3398),g=r.n(u),p=r(6220),_=e([c]);function m({category:e,language:t,langParam:r,platform:a}){let i=(0,d.iV)(e.title,t),n=(0,d.Oi)(e.leftColumnDescription,t),o=2===e.level&&e.parent?.tags?e.parent.tags:e.tags,u=(0,d.iV)(o,t),p=1===e.level,_=e.children??[],m=e.products??[],x=e.parent?.isEvent??!1,b=m.filter(e=>!0===e.isEvent&&!0!==e.isExpired),w=m.filter(e=>!0!==e.isEvent),j=[],P=[...j=p?_:x?b:w];for(;P.length<9;)P.push(null);return(0,l.jsx)("section",{className:g().section,children:(0,l.jsx)("div",{className:g().container,children:(0,l.jsxs)("div",{className:g().flexContainer,children:[(0,l.jsxs)("div",{className:g().aside,children:[(0,l.jsxs)("div",{className:g().coverImageSection,children:[e.coverURL?(0,l.jsx)("div",{className:g().coverImageWrapper,children:(0,l.jsx)(s(),{src:e.coverURL,alt:i||"",fill:!0,className:"object-cover",sizes:"(max-width: 768px) 100vw, 40vw"})}):null,(0,l.jsxs)("div",{className:g().titleSection,children:[u&&(0,l.jsx)("span",{className:g().subTitle,children:u}),u&&(0,l.jsx)("span",{className:g().subTitle,children:"★"}),(0,l.jsx)("h1",{className:g().mainTitle,children:i})]})]}),(0,l.jsxs)("div",{className:g().descriptionSection,children:[(0,l.jsx)(c.A,{value:n,className:g().description}),b.length>0?(0,l.jsxs)("div",{className:g().eventsSectionDesktop,children:[(0,l.jsxs)("p",{className:g().eventsTitle,children:["zhHans"===t&&"店内相关活动","zhHant"===t&&"店內相關活動","en"===t&&"Related In-Store Events"]}),(0,l.jsx)("div",{className:g().eventsList,children:b.map(e=>(0,l.jsx)(h,{product:e,language:t,langParam:r},e._id))})]}):null]}),a?.platforms&&a.platforms.length>0&&(0,l.jsx)("div",{className:g().contactPlatformsDesktop,children:a.platforms.map(e=>(0,l.jsx)("div",{className:g().platformItem,children:e.logoUrl&&(0,l.jsx)("div",{className:g().platformLogoWrapper,onClick:()=>{window.open(e.qrCodeUrl,"_blank")},children:(0,l.jsx)(s(),{src:e.logoUrl,alt:"zhHans"===t||"zhHant"===t?"平台 Logo":"Platform Logo",width:30,height:30,className:g().platformLogo})})},e._key))})]}),(0,l.jsxs)("div",{className:g().content,children:[(0,l.jsx)(v,{category:e,langParam:r,language:t}),(0,l.jsx)("div",{className:g().mainContent,children:(0,l.jsx)("div",{className:g().grid,children:P.map((a,i)=>{var s;return null===a?(0,l.jsx)(C,{},`placeholder-${i}`):(s=a,"level"in s||"leftColumnTitle"in s)?(0,l.jsx)(f,{item:a,langParam:r,language:t,parentId:p?e._id:void 0},a._id):(0,l.jsx)(y,{product:a,language:t,langParam:r},a._id)})})}),b.length>0?(0,l.jsxs)("div",{className:g().eventsSectionMobile,children:[(0,l.jsxs)("p",{className:g().eventsTitle,children:["zhHans"===t&&"店内相关活动","zhHant"===t&&"店內相關活動","en"===t&&"Related In-Store Events"]}),(0,l.jsx)("div",{className:g().eventsList,children:b.map(e=>(0,l.jsx)(h,{product:e,language:t,langParam:r},e._id))})]}):null,a?.platforms&&a.platforms.length>0&&(0,l.jsx)("div",{className:g().contactPlatformsMobile,children:a.platforms.map(e=>(0,l.jsx)("div",{className:g().platformItem,children:e.logoUrl&&(0,l.jsx)("div",{className:g().platformLogoWrapper,onClick:()=>{window.open(e.qrCodeUrl,"_blank")},children:(0,l.jsx)(s(),{src:e.logoUrl,alt:"zhHans"===t||"zhHant"===t?"平台 Logo":"Platform Logo",width:30,height:30,className:g().platformLogo})})},e._key))})]})]})})})}function v({category:e,langParam:t,language:r}){let a=[];return e.parent&&a.push({label:(0,d.iV)(e.parent.title,r),id:e.parent._id}),a.push({label:(0,d.iV)(e.title,r),id:e._id}),(0,l.jsxs)("nav",{className:g().breadcrumb,children:[(0,l.jsxs)(o(),{href:`/${t}`,className:g().breadcrumbLink,children:["zhHans"===r&&"首页","zhHant"===r&&"首頁","en"===r&&"Home"]}),a.map((e,r)=>(0,l.jsxs)("span",{className:g().breadcrumbSegment,children:[(0,l.jsx)("span",{className:g().breadcrumbSeparator,children:"/"}),e.id?(0,l.jsx)(o(),{href:`/${t}/category/${e.id}`,className:r===a.length-1?g().breadcrumbActive:g().breadcrumbLink,children:e.label}):(0,l.jsx)("span",{className:g().breadcrumbActive,children:e.label})]},e.id||r))]})}function f({item:e,langParam:t,language:r,parentId:a}){let i=a?`/${t}/category/${e._id}?parent=${a}`:`/${t}/category/${e._id}`;return(0,l.jsxs)(o(),{href:i,className:g().categoryCard,children:[e.coverURL?(0,l.jsx)("div",{className:g().categoryImageWrapper,children:(0,l.jsx)(s(),{src:e.coverURL,alt:(0,d.iV)(e.title,r)||"",fill:!0,className:"object-cover",sizes:"(max-width: 768px) 50vw, 20vw"})}):null,(0,l.jsx)("p",{className:g().categoryTitle,children:(0,d.iV)(e.title,r)})]})}function y({product:e,language:t,langParam:r}){let a=(0,p.useSearchParams)().get("parent");return(0,l.jsxs)(o(),{href:a?`/${r}/product/${e._id}?parent=${a}`:`/${r}/product/${e._id}`,className:g().productCard,children:[e.thumbnail?(0,l.jsx)("div",{className:g().productImageWrapper,children:(0,l.jsx)(s(),{src:e.thumbnail,alt:(0,d.iV)(e.title,t)||"",fill:!0,className:"object-cover",sizes:"(max-width: 768px) 50vw, 20vw"})}):null,(0,l.jsx)("div",{className:g().productInfo,children:(0,l.jsx)("p",{className:g().productTitle,children:(0,d.iV)(e.title,t)})})]})}function h({product:e,language:t,langParam:r}){let a=e.tags?.map(e=>(0,d.iV)(e,t)).filter(Boolean).slice(0,3)||[];console.log(e);let[i,s,n]=[a[0]||"",a[1]||"",a[2]||""],c=(0,p.useSearchParams)().get("parent");return(0,l.jsx)(o(),{href:c?`/${r}/product/${e._id}?parent=${c}`:`/${r}/product/${e._id}`,className:g().eventProductCard,children:(0,l.jsx)("div",{className:g().eventProductInfo,children:a.length>0&&(0,l.jsxs)("div",{className:g().eventProductTags,children:[i&&(0,l.jsx)("p",{className:g().eventProductTag,children:i}),i&&s&&(0,l.jsx)("p",{className:g().tagSeparator,children:"★"}),s&&(0,l.jsx)("p",{className:g().eventProductTagCenter,children:s}),s&&n&&(0,l.jsx)("p",{className:g().tagSeparator,children:"★"}),n&&(0,l.jsx)("p",{className:g().eventProductTag,children:n})]})})})}function C(){return(0,l.jsxs)("div",{className:g().placeholderCard,children:[(0,l.jsx)("div",{className:g().placeholderImageWrapper}),(0,l.jsx)("div",{className:g().placeholderTitle})]})}c=(_.then?(await _)():_)[0],a()}catch(e){a(e)}})},8952:(e,t,r)=>{"use strict";r.d(t,{A:()=>l});var a=r(8732);function l({children:e,langParam:t}){return(0,a.jsx)("div",{className:`min-h-screen bg-waura-pink text-waura-brown ${"en"===t?"english":"chinese"}`,children:(0,a.jsx)("main",{children:e})})}},8978:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{default:()=>m,getServerSideProps:()=>v});var l=r(8732),i=r(9788),s=r.n(i),n=r(8839),o=r(8952),c=r(4178),d=r(2356),u=r(6801),g=r(3054),p=r(9071),_=e([n,c,u]);function m({langParam:e,languageKey:t,category:r,platform:a}){let i=(0,p.iV)(r.title,t),c=i?`${i} - gallery瓦聞`:"gallery瓦聞";return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s(),{children:(0,l.jsx)("title",{children:c})}),(0,l.jsx)(o.A,{langParam:e,pathSegments:["category",r._id||""],children:(0,l.jsx)(n.A,{category:r,language:t,langParam:e,platform:a})})]})}[n,c,u]=_.then?(await _)():_;let v=async({params:e,query:t})=>{let r=(0,d.Iy)(e?.lang),a=e?.slug,l=t.parent;if(!u.G||!a)return{notFound:!0};let[i,s]=await Promise.all([u.G.fetch(c.uP,{id:a}),u.G.fetch(c.kz).catch(()=>null)]);if(!i)return{notFound:!0};if(2===i.level){let e=i.parent?._id;if(l){let t=await u.G.fetch(`*[_type == "productCategory" && _id == $parentId && $level2Id in children[]._ref][0]{
          _id,
          "title": label,
          level,
          isEvent,
          "coverURL": coverURL.asset->url,
          leftColumnTitle,
          leftColumnDescription
        }`,{parentId:l,level2Id:a});t&&(e=l,i.parent=t)}if(!e){let t=await u.G.fetch(`*[_type == "productItem" && level2Category._ref == $level2Id]{
          _id,
          "level1CategoryRef": level1Category._ref
        }`,{level2Id:a}),r=new Map;if(t.forEach(e=>{e.level1CategoryRef&&r.set(e.level1CategoryRef,(r.get(e.level1CategoryRef)||0)+1)}),r.size>0&&(e=Array.from(r.entries()).sort((e,t)=>t[1]-e[1])[0][0])!==i.parent?._id){let t=await u.G.fetch(`*[_type == "productCategory" && _id == $parentId][0]{
              _id,
              "title": label,
              level,
              isEvent,
              "coverURL": coverURL.asset->url,
              leftColumnTitle,
              leftColumnDescription
            }`,{parentId:e});t&&(i.parent=t)}}if(e){let t=await u.G.fetch(`*[_type == "productCategory" && _id == $parentId][0]{
          isEvent
        }`,{parentId:e});t?.isEvent?i.products=(await u.G.fetch(`*[_type == "productItem" && isEvent == true && (isExpired != true || !defined(isExpired))] | order(sortOrder asc){
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
            "level2CategoryRef": level2Category._ref,
            "thumbnail": coalesce(gallery[0].asset->url, "")
          }`)).filter(e=>e.level2CategoryRef===a):i.products=await u.G.fetch(`*[_type == "productItem" && level2Category._ref == $level2Id && level1Category._ref == $level1Id] | order(sortOrder asc){
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
          }`,{level2Id:a,level1Id:e}),i.events=await u.G.fetch(`*[_type == "event" && level2Category._ref == $level2Id && level1Category._ref == $level1Id] | order(startDate desc){
          _id,
          title,
          description,
          startDate,
          endDate,
          "cover": cover.asset->url
        }`,{level2Id:a,level1Id:e})}}if(console.log("=== Category Query Debug ==="),console.log("Category ID:",a),console.log("Category Level:",i.level),console.log("Category Title:",i.title),2===i.level){console.log("Parent:",i.parent),console.log("Parent ID:",i.parent?._id);let e=await u.G.fetch(`*[_type == "productItem" && level2Category._ref == $level2Id]{
        _id,
        title,
        "level1CategoryRef": level1Category._ref,
        "level2CategoryRef": level2Category._ref
      }`,{level2Id:a});if(console.log("All products for level2 category (no level1 filter):",e.length),e.length>0&&console.log("Sample product:",JSON.stringify(e[0],null,2)),i.parent?._id){let e=await u.G.fetch(`*[_type == "productItem" && level2Category._ref == $level2Id && level1Category._ref == $level1Id]{
          _id,
          title,
          "level1CategoryRef": level1Category._ref,
          "level2CategoryRef": level2Category._ref
        }`,{level2Id:a,level1Id:i.parent._id});console.log("Products with level1 filter:",e.length),e.length>0&&console.log("Sample filtered product:",JSON.stringify(e[0],null,2))}}console.log("Products Count from query:",i.products?.length||0),i.products&&i.products.length>0?console.log("First Product from query:",JSON.stringify(i.products[0],null,2)):console.log("No products found in query result"),console.log("===========================");let n=(0,g.R)(i);n.isEvent&&(n.products=await u.G.fetch(`*[_type == "productItem" && isEvent == true && (isExpired != true || !defined(isExpired))] | order(sortOrder asc){
        _id,
        "slug": slug.current,
        title,
        tags,
        summary,
        description,
        price,
        isEvent,
        isExpired,
        "thumbnail": coalesce(gallery[0].asset->url, "")
      }`));let o=(0,d.K)(r);return{props:{langParam:r,languageKey:o,category:n,id:a,platform:s||void 0}}};a()}catch(e){a(e)}})},9001:()=>{},9021:e=>{"use strict";e.exports=require("fs")},9071:(e,t,r)=>{"use strict";r.d(t,{Oi:()=>i,Sh:()=>s,iV:()=>l});let a=["zhHans","zhHant","en"];function l(e,t){if(!e)return"";if(e[t])return e[t];for(let t of a)if(e[t])return e[t];return""}function i(e,t){if(!e)return[];if(e[t])return e[t];for(let t of a)if(e[t])return e[t];return[]}function s(e,t){if(!e)return"";if(e[t])return e[t];for(let t of a)if(e[t])return e[t];return""}},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9602:e=>{"use strict";e.exports=import("@portabletext/react")},9728:e=>{"use strict";e.exports=import("next-sanity")}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[89,190,616,358,761,839],()=>r(2303));module.exports=a})();