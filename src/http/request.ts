import router from "@/router";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { publicIp } from "./apiIp";
// import { message } from "antd";
// import { history } from "../router/indexRouter";
// import { message } from "ant-design-vue/types/ant-design-vue";
// import router from "../router/routerconfig";

// 头部配置项
const headers = {
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Headers":
    "Accept,Accept-Language,Accept-Encoding,Host,Connection,Origin,Referer,User-Agent,Content-Type,Content-Language,X-Requested-With,Cookie,If-Modified-Since,Cache-Control",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  Connection: "keep-alive",
  "Content-Type": "application/json;charset=UTF-8",
  Server: "nginx",
  "Transfer-Encoding": "chunked",
};

// 创建axios实例
export const axiosInstance = axios.create({
  baseURL: publicIp,
  timeout: 1000,
  headers: headers,
});

// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

interface HttpCodeType {
  "400": string;
  "401": string;
  "403": string;
  "404": string;
  "500": string;
  "501": string;
  "502": string;
  "504": string;
  // 扩展
  [code: string]: string;
}

// 状态码  可以自己扩展
const httpCode: HttpCodeType = {
  400: "请求参数错误",
  401: "权限不足, 请重新登录",
  403: "服务器拒绝本次访问",
  404: "请求资源未找到",
  500: "内部服务器错误",
  501: "服务器不支持该请求中使用的方法",
  502: "网关错误",
  504: "网关超时",
};

// 控制loading的展示和隐藏
const hide: (() => any) | null = null;

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers.token = sessionStorage.getItem("token") || "";
    // hide = message.loading({ content: "Loading...", duration: 0 });
    // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
    if (config?.url?.includes("/export")) {
      config.headers.responseType = "blob";
    }
    // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
    if (config?.url?.includes("/upload")) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },

  // 对请求错误做些什么
  (error) => {
    return Promise.reject(error);
  }
);

// 相应数据拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // hide && hide();
    if (response.statusText === "ok") {
      // 响应结果里的statusText: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
      return Promise.resolve(response.data);
    } else {
      // message.error("响应超时");
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    // hide && hide();
    if (error?.response) {
      // 根据请求失败的http状态码去给用户相应的提示
      const code = `${error?.response?.status}`;
      const tips =
        (code in httpCode && httpCode["2000"]) ||
        error?.response?.data?.message;

      // message.error(tips);
      if (error?.response?.status === 401) {
        // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
        // 针对框架跳转到登陆页面
        router.push('/');
      } else if (error?.response?.status === 404) {
        // message.error("页面出错");
      }
      return Promise.reject(error);
    } else {
      // message.error("请求超时, 请刷新重试");
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject("请求超时, 请刷新重试");
    }
  }
);

// 请求处理
export default function requsest (paramData: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    axiosInstance({ method: "get", ...paramData })
      .then((response) => resolve(response))
      .catch((response) => reject(response));
  });
}
