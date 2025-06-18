import instance from "../utils/request";
export const getClassApi=()=>{
    return instance({
        url:'/Index/classList',
        method:'get'
    })
}
export const getProductListApi=(data)=>{
    return instance({
        url:'/Index/lists',
        method:'post',
data
    })
}