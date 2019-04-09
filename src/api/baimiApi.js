import { get, post } from '../axios/http'
import QS from 'qs';
/**
 * QS有QS.parse() 格式化的字符串转换为对象格式
 * QS.stringify() 一个参数对象格式化为一个字符串
 * 根据需求使用
 *
 * this.baimiAPI.postDemo(data).then(response => {
       window.console.log(response)
      }).catch((err)=>{
       window.console.log(err)
      })
 */
const api={
    //getDemo data可以不传数据
    getDemo (data) {
        return get('apiDemo', data);
    },
    //postDemo
   postDemo (data) {
        return post('apiDemo', QS.stringify(data));
    },
}
export default api;