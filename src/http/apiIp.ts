// 对外提供的服务地址
export const publicIp =
  process.env.NODE_ENV === "development"
    ? "https://test-umsauth.quanshi.com"
    : "";
// 对外提供获取图片的地址
export const logoImgIp = process.env.NODE_ENV === "development" ? "" : "";

// 登录请求
export const LOGIN = "/api/commons/getPublickey";
