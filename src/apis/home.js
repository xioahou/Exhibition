import instance from "../utils/request";
//语言列表
export const getLanguageListApi = () => {
  return instance({
    url: "index/languageList",
  });
};
//产品分类
export const getProductListApi = (lang) => {
  return instance({
    url: "index/classList",
    headers: {
      lang,
    },
  });
};
