import {get, post} from '../axios/http'
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
const api = {
  //getDemo data可以不传数据
  getDemo(data) {
    return get('apiDemo', QS.stringify(data));
  },
  getAddedPointList(data) {
    return get('partnerAccount/pointList.htm', QS.stringify(data));
  },
  getNoAddPointList(data) {
    return get('partnerAccount/notAddedPointList.htm', QS.stringify(data));
  },
  getPartnerConfigData(data, params) {
    return post('partnershipConfig/getPartnershipConfig.htm', QS.stringify(data), {params: params});
  },
  addPartnerPoint(data, params) {
    return post('partnershipConfig/addPartnershipConfig.htm', QS.stringify(data), {params: params});
  },
  updatePartnerPoint(data, params) {
    return post('partnershipConfig/modifyPartnershipConfig.htm', QS.stringify(data), {params: params});
  },
  switchCharging(data) {
    return post('partnershipConfig/switchCharging.htm', QS.stringify(data));
  },
  switchBalanceCheck(data, params) {
    return post('partnershipConfig/switchBalanceCheck.htm', QS.stringify(data), {params: params});
  },
  getReport(data, params) {
    return post('partnerBill/report.htm', QS.stringify(data), {params: params});
  },
  getBillData(data) {
    return get('partnerBill/list.htm', (data));
  },
  getReportData(data) {
    return get('partnerBill/pointReport.htm', (data));
  },
  exportPartnerPointReport(data) {
    return get('export/exportPartnerPointReport.htm', (data), {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
      }
    });
  },
  //postDemo
  postDemo(data) {
    return post('apiDemo', QS.stringify(data));
  },
}
export default api;