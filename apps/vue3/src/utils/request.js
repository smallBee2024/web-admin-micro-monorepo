/**
 * 接口请求工具
 * 基于 axios 封装的 HTTP 请求工具，提供统一的请求拦截、响应处理和错误处理
 */

import axios from 'axios'
// import { message } from 'element-plus'

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_API || '', // 基础请求地址
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: true,
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 可以在这里添加 token 等认证信息
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 显示加载状态（可选）
    // console.log('请求开始:', config.url)
    
    return config
  },
  error => {
    // 对请求错误做些什么
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const { data, status } = response
    
    // 根据后端接口规范处理响应数据
    if (status === 200) {
      // 如果后端返回的数据结构是 { code, data, message }
      if (data.code !== undefined) {
        if (data.code === 200 || data.code === 0) {
          return data.data || data
        } else {
          // 业务错误
          // Message.error(data.message || '请求失败')
          return Promise.reject(new Error(data.message || '请求失败'))
        }
      }
      // 如果后端直接返回数据
      return data
    } else {
      // Message.error('请求失败')
      return Promise.reject(new Error('请求失败'))
    }
  },
  error => {
    // 对响应错误做点什么
    console.error('响应错误:', error)
    
    let message = '网络错误，请稍后重试'
    
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          message = '未授权，请重新登录'
          // 清除本地存储的 token
          localStorage.removeItem('token')
          // 可以在这里跳转到登录页
          // router.push('/login')
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求地址不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        case 502:
          message = '网关错误'
          break
        case 503:
          message = '服务不可用'
          break
        case 504:
          message = '网关超时'
          break
        default:
          message = data?.message || `连接错误${status}`
      }
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时'
    } else if (error.message.includes('Network Error')) {
      message = '网络连接异常'
    }
    
    // Message.error(message)
    return Promise.reject(error)
  }
)

// 封装常用的请求方法
export const http = {
  /**
   * GET 请求
   * @param {string} url 请求地址
   * @param {object} params 请求参数
   * @param {object} config 请求配置
   */
  get(url, params = {}, config = {}) {
    return request({
      method: 'get',
      url,
      params,
      ...config
    })
  },

  /**
   * POST 请求
   * @param {string} url 请求地址
   * @param {object} data 请求数据
   * @param {object} config 请求配置
   */
  post(url, data = {}, config = {}) {
    return request({
      method: 'post',
      url,
      data,
      ...config
    })
  },

  /**
   * PUT 请求
   * @param {string} url 请求地址
   * @param {object} data 请求数据
   * @param {object} config 请求配置
   */
  put(url, data = {}, config = {}) {
    return request({
      method: 'put',
      url,
      data,
      ...config
    })
  },

  /**
   * DELETE 请求
   * @param {string} url 请求地址
   * @param {object} config 请求配置
   */
  delete(url, config = {}) {
    return request({
      method: 'delete',
      url,
      ...config
    })
  },

  /**
   * PATCH 请求
   * @param {string} url 请求地址
   * @param {object} data 请求数据
   * @param {object} config 请求配置
   */
  patch(url, data = {}, config = {}) {
    return request({
      method: 'patch',
      url,
      data,
      ...config
    })
  },

  /**
   * 文件上传
   * @param {string} url 上传地址
   * @param {FormData} formData 文件数据
   * @param {object} config 请求配置
   */
  upload(url, formData, config = {}) {
    return request({
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    })
  },

  /**
   * 文件下载
   * @param {string} url 下载地址
   * @param {object} params 请求参数
   * @param {string} filename 文件名
   */
  download(url, params = {}, filename = '') {
    return request({
      method: 'get',
      url,
      params,
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response])
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename || 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    })
  }
}

// 导出 axios 实例，供特殊需求使用
export default request
