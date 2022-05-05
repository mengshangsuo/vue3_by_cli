console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// 对外提供的服务地址
export const publicIp =
  process.env.NODE_ENV === "development"
    ? "https://test-umsauth.quanshi.com"
    : "";

// 登录请求
export const LOGIN = "/api/commons/getPublickey";
