import instance from "../utils/request";
//语言列表
export const getLanguageListApi = () => {
  return instance({
    url: "index/languageList",
  });
};
//产品分类
export const getProductListApi = (lang) => {
  console.log(lang);

  return instance({
    url: "index/classList",
    method: "get",
    headers: {
      lang,
    },
  });
};
//产品列表
export const getProductApi = (params, lang) => {
  console.log(params);

  return instance({
    url: "index/lists",
    method: "get",
    headers: {
      lang,
    },
    params,
  });
};
//打开页面统计
export const getOpenPageApi = () => {
  return instance({
    url: "index/lists",
    method: "get",
  });
};
