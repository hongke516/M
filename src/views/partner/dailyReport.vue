<template>
  <Card dis-hover>
    <Form ref="formValidate" :model="formValidate" :label-width="80">
      <Row>
        <i-col :span="12">
          <FormItem label="网点" prop="address">
            <i-select style="max-width: 200px" v-model="formValidate.pointId" placeholder="请选择">
              <Option :value="''">请选择</Option>
              <Option v-for="(point, index) in addedPointList" :key="index" :value="point.id">{{point.name}}</Option>
            </i-select>
          </FormItem>
        </i-col>
        <i-col :span="12">
          <FormItem label="更新时间" prop="date">
            <Row>
              <i-col :span="11">
                <DatePicker type="date" clearable format="yyyy-MM-dd" placeholder="请选择日期" v-model="formValidate.updateStartTime"></DatePicker>
              </i-col>
              <i-col :span="2">至</i-col>
              <i-col :span="11">
                <DatePicker type="date" format="yyyy-MM-dd" placeholder="请选择日期" v-model="formValidate.updateEndTime"></DatePicker>
              </i-col>
            </Row>
          </FormItem>
        </i-col>
      </Row>
    </Form>
    <Row>
      <i-col :span="12">
        <RadioGroup v-model="time" type="button">
          <Radio label="today">今日</Radio>
          <Radio label="yesterday">昨日</Radio>
          <Radio label="month">本月</Radio>
        </RadioGroup>
      </i-col>
      <i-col :span="12" style="text-align: right;">
        <Button type="primary" style="margin-right: 16px;">充值</Button>
        <Button type="primary" @click="fetchData()">搜索</Button>
      </i-col>
    </Row>
    <br>
    <div>
      <Alert type="error">注意：今日的账单还未生成，所有费用暂未扣除。</Alert>
      <Row :gutter="16">
        <i-col :span="16">
          <Row>
            <i-col :span="12">
              <Card dis-hover>
                <Row>
                  <i-col :span="12">派件抽成</i-col>
                  <i-col :span="12" style="text-align: right;">{{((report.receiveCommission||0)/1000).toFixed(3)}}元/件</i-col>
                </Row>
                <Row style="font-size: 24px;">
                  {{((-report.receiveFee||0)/1000).toFixed(3)}}￥
                </Row>
                <Row>
                  总接件数： {{report.totalReceive||0}} 件
                </Row>
                <Row>
                  <i-col :span="12">普通接件数： {{report.receive||0}} 件</i-col>
                  <i-col :span="12" style="text-align: right;">快投接件数：{{report.quickReceive||0}} 件</i-col>
                </Row>
              </Card>
            </i-col>
            <i-col :span="12">
              <Card dis-hover>
                <Row>
                  <i-col :span="12">短信计费</i-col>
                  <i-col :span="12" style="text-align: right;">{{((report.smsFee||0)/1000).toFixed(3)}}元/条</i-col>
                </Row>
                <Row style="font-size: 24px;">
                  {{((-report.smsAmount||0)/1000).toFixed(3)}}￥
                </Row>
                <Row>
                  短信计费数： {{report.realSmsCount||0}} 条
                </Row>
                <Row>
                  <i-col :span="12">正常短信数： {{report.smsCount||0}} 条</i-col>
                  <i-col :span="12" style="text-align: right;">超长短信数： {{report.longSmsCount||0}} 条</i-col>
                </Row>
              </Card>
            </i-col>
          </Row>
          <Row>
            <i-col :span="12">
              <Card dis-hover>
                <Row>
                  <i-col :span="12">管理费</i-col>
                </Row>
                <Row style="font-size: 24px;">
                  {{((report.managementFee||0)/1000).toFixed(3)}}￥
                </Row>
                <Row>
                  <br>
                </Row>
                <Row>
                  <br>
                </Row>
              </Card>
            </i-col>
            <i-col :span="12">
              <Card dis-hover>
                <Row>
                  <i-col :span="12">其他扣费</i-col>
                </Row>
                <Row style="font-size: 24px;">
                  {{((-report.finedAmount||0)/1000).toFixed(3)}}￥
                </Row>
                <Row>
                  <br>
                </Row>
                <Row>
                  <br>
                </Row>
              </Card>
            </i-col>
          </Row>
          <Row>
            <i-col :span="12">
              <Card dis-hover>
                <Row>
                  <i-col :span="12">揽派比</i-col>
                  <i-col :span="12" style="text-align: right;">目标值{{((report.sendReceiveRatio||0)/1000).toFixed(3)}}</i-col>
                </Row>
                <Row style="font-size: 24px;">
                  {{((report.realSendReceiveRatio||0)/1000).toFixed(3)}}
                </Row>
                <Row>
                  <br>
                </Row>
                <Row>
                  <i-col :span="12">总接件数： {{report.totalReceive||0}} 件</i-col>
                  <i-col :span="12" style="text-align: right;">总揽件数： {{report.totalSend||0}} 件</i-col>
                </Row>
              </Card>
            </i-col>
            <i-col :span="12">
              <Card dis-hover>
                <Row>
                  <i-col :span="12">揽件抽成</i-col>
                  <i-col :span="12" style="text-align: right;">{{((report.sendCommission||0)/1000).toFixed(3)}}元/条</i-col>
                </Row>
                <Row style="font-size: 24px;">
                  {{((-report.sendFee||0)/1000).toFixed(3)}}￥
                </Row>
                <Row>
                  平台揽件数量： {{report.stageSend||0}} 件
                </Row>
                <Row>
                  <i-col :span="12">微信揽件数量： {{report.appSend||0}} 条</i-col>
                  <i-col :span="12" style="text-align: right;">总揽件数量： {{report.totalSend||0}} 件</i-col>
                </Row>
              </Card>
            </i-col>
          </Row>
        </i-col>
        <i-col :span="8">
          <Row>
            <Card dis-hover>
              <Row>总扣费</Row>
              <Row class="info-color" style="font-size: 24px;">
                {{((-report.totalAmount||0)/1000).toFixed(3)}}￥
              </Row>
              <Row>
                <p>注：每天的总扣费发生在次日凌晨，今日产生的费用暂为扣除。</p>
              </Row>
            </Card>
          </Row>
          <br>
          <Row>
            <Card dis-hover>
              <Row>充值</Row>
              <Row class="error-color" style="font-size: 24px;">
                {{((report.rechargeAmount||0)/1000).toFixed(3)}}￥
              </Row>
            </Card>
          </Row>
          <br>
          <Row>
            <Card dis-hover>
              <Row>余额</Row>
              <Row class="error-color" style="font-size: 24px;">
                {{((report.accountBalance||0)/1000).toFixed(3)}}￥
              </Row>
            </Card>
          </Row>
        </i-col>
      </Row>
    </div>
    <Modal
            v-model="modal1"
            title="账户余额充值"
            width="800"
            :loading="modalLoading"
            @on-ok="sumbitNewForm"
    >
      <Form ref="newForm" :model="newForm" :rules="newFormRules" :label-width="120">
        <Alert>加盟网点信息</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem label="网点" prop="pointId">
              <i-select v-model="newForm.pointId" placeholder="请选择" v-if="mode === 'add'">
                <Option v-for="(point, index) in noAddPointList" :key="index" :value="point.id">{{point.name}}</Option>
              </i-select>
              <Input v-else v-model="newForm.pointName" disabled/>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <FormItem label="合伙人姓名" prop="partnerName">
              <Input v-model="newForm.partnerName" :disabled="mode === 'detail'"/>
            </FormItem>
          </i-col>
        </Row>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem label="合伙人联系电话" prop="phoneNumber">
              <Input v-model="newForm.phoneNumber" :disabled="mode === 'detail'"/>
            </FormItem>
          </i-col>
        </Row>
        <Alert>充值金额设置</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem style="margin-top: 12px" label="充值金额" prop="receiveCommission">
              <i-input v-model="newForm.receiveCommission" :disabled="mode === 'detail'">
                <span slot="append">元</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <Card dis-hover class="import-info">{{newForm.receiveCommission}}元</Card>
          </i-col>
        </Row>
        <Alert>揽件抽成设置</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem style="margin-top: 12px" label="揽件抽成/件/元" prop="sendCommission">
              <i-input v-model="newForm.sendCommission" :disabled="mode === 'detail'">
                <span slot="append">元</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <Card dis-hover class="import-info">{{newForm.sendCommission}}元</Card>
          </i-col>
        </Row>
        <Alert>揽派比目标值设置</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem style="margin-top: 12px" label="揽派比目标值" prop="sendReceiveRatio">
              <i-input v-model="newForm.sendReceiveRatio" :disabled="mode === 'detail'">
                <span slot="append">元</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <Card dis-hover class="import-info">{{newForm.sendReceiveRatio}}元</Card>
          </i-col>
        </Row>
        <Alert>短信计费配置</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem style="margin-top: 12px" label="短信费用/条/元" prop="smsFee">
              <i-input v-model="newForm.smsFee" :disabled="mode === 'detail'">
                <span slot="append">元</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <Card dis-hover class="import-info">{{newForm.smsFee}}元</Card>
          </i-col>
        </Row>
        <Alert>管理费配置</Alert>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem style="margin-top: 12px" label="管理费用/月/元" prop="managementFee">
              <i-input v-model="newForm.managementFee" :disabled="mode === 'detail'">
                <span slot="append">元</span>
              </i-input>
            </FormItem>
          </i-col>
          <i-col :span="12">
            <Card dis-hover class="import-info">{{newForm.managementFee}}元</Card>
          </i-col>
        </Row>
        <Row>
          <FormItem style="margin-top: 12px" label="管理费扣款月份" prop="managementFeeMonth">
            <Row>
              <span style="margin-right: 4px" v-for="n in 12" :key="n" >
                <Button :type="newForm.managementFeeMonth.split(',').includes(String(n))?'primary':'default'"
                        size="small" @click="mode !== 'detail' && selectMonth(n)">{{n}}月</Button>
              </span>
            </Row>
          </FormItem>
        </Row>
        <Row :gutter="32">
          <i-col :span="12">
            <FormItem label="管理费扣款日期" prop="managementFeeDay">
              <i-select v-model="newForm.managementFeeDay" placeholder="请选择" :disabled="mode === 'detail'">
                <Option v-for="m in 28" :key="m" :value="m">{{m}}号</Option>
              </i-select>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Modal>
  </Card>
</template>

<script>
// @ is an alias to /src
import partnerApi from '../../api/partnerApi'
import vtype from '../../libs/vtype'
import {formatDate} from '../../libs/tools'
export default {
  name: 'partnerDailyReport',
  components: {
  },
  data () {
    return {
      addedPointList: [],
      formValidate: {
        pointId: '',
        updateEndTime: '',
        updateStartTime: ''
      },
      time: 'today',
      report: {},
      newForm: {
        pointId: '',
        partnerName: '',
        phoneNumber: '',
        receiveCommission: '',
        sendCommission: '',
        smsFee: '',
        managementFee: '',
        managementFeeMonth: '',
        managementFeeDay: '',
        sendReceiveRatio: ''
      },
      newFormRules: {
        pointId: [
          { type: 'number', required: true, message: '请在列表中选择一项', trigger: 'change' },
        ],
        partnerName: [
          { required: true, message: '请填写', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请填写', trigger: 'blur' },
          { validator: vtype.phone, trigger: 'blur' }
        ],
        managementFeeDay: [
          { type: 'number', required: true, message: '请输入', trigger: 'change' },
        ]
      }
    }
  },
  watch: {
    'formValidate.updateStartTime': function(val, oldval) {
      window.console.log(val, oldval)
      this.time = ''
    },
    'formValidate.updateEndTime': function(val, oldval) {
      window.console.log(val, oldval)
      this.time = ''
    }
  },
  mounted () {
    partnerApi.getAddedPointList()
      .then(response => {
        if (response.status === 'success') {
          this.addedPointList = response.object || []
        } else {
          this.$Message.error(response.message);
        }
      }).catch((err)=>{
      window.console.log(err)
    })
  },
  methods: {
    fetchData () {
      if (this.formValidate.pointId === '') {
        this.$Message.error('网点必选！');
        return
      }
      if ((this.formValidate.updateStartTime === '' || this.formValidate.updateEndTime === '') &&
          (this.time === '' && this.formValidate.updateStartTime === '' && this.formValidate.updateEndTime === '')) {
        this.$Message.error('请选择时间！');
        return
      }
      let startTime = ''
      let endTime = ''
      if (this.time === 'today') {
        endTime = startTime = new Date().Format('yyyy-MM-dd')
      } else if (this.time === 'yesterday') {
        endTime = startTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).Format('yyyy-MM-dd')
      } else if (this.time === 'month') {
        startTime = new Date().Format('yyyy-MM-01')
        endTime = new Date(new Date().Format('yyyy'), new Date().Format('MM'), 0).Format('yyyy-MM-dd')
      }
      window.console.log(new Date().Format('yyyy'), new Date().Format('MM'))
      let params = {
        pointId: this.formValidate.pointId,
        startTime: this.formValidate.updateStartTime !== '' ?
          formatDate(this.formValidate.updateStartTime, 'yyyy-MM-dd') : startTime,
        endTime: this.formValidate.updateEndTime !== '' ?
          formatDate(this.formValidate.updateEndTime, 'yyyy-MM-dd') : endTime
      }
      partnerApi.getReport(null, params)
        .then(response => {
          if (response.status === 'success') {
            window.console.log(response)
            this.report = response.object
          } else {
            this.$Message.error(response.message);
          }
        }).catch((err)=>{
        window.console.log(err)
      })
    }
  }
}
</script>
<style scoped lang="less">
  @import "../../theme/var.less";
 .info-color{
   color: @info-color;
 }
  .error-color{
    color: @error-color;
  }
</style>