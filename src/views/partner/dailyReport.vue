<template>
  <Card dis-hover>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :inline="true" :label-width="80">
      <FormItem label="网点" prop="address">
        <i-select v-model="formValidate.address" placeholder="请选择">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </i-select>
      </FormItem>
      <FormItem label="Date">
        <FormItem prop="date">
          <DatePicker type="daterange" placeholder="Select date" v-model="formValidate.daterange"></DatePicker>
        </FormItem>
      </FormItem>
    </Form>
    <Row>
      <i-col :span="12">
        <RadioGroup v-model="buttonSize" type="button">
          <Radio label="large">今日</Radio>
          <Radio label="default">昨日</Radio>
          <Radio label="small">本月</Radio>
        </RadioGroup>
      </i-col>
      <i-col :span="12" style="text-align: right;">
        <Button type="primary" style="margin-right: 16px;">充值</Button>
        <Button type="primary">搜索</Button>
      </i-col>
    </Row>
    <div style="margin-top: 16px;">
      <Alert type="error">注意：今日的账单还未生成，所有费用暂未扣除。</Alert>
      <Row :gutter="16">
        <i-col :span="16">
          <Row>
            <i-col :span="12">
              <Card dis-hover>
                <Row>
                  <i-col :span="12">派件抽成</i-col>
                  <i-col :span="12" style="text-align: right;">0.000元/件</i-col>
                </Row>
                <Row style="font-size: 24px;">
                  0.000￥
                </Row>
                <Row>
                  总接件数： 0 件
                </Row>
                <Row>
                  <i-col :span="12">普通接件数： 0 件</i-col>
                  <i-col :span="12" style="text-align: right;">快投接件数： 0 件</i-col>
                </Row>
              </Card>
            </i-col>
            <i-col :span="12">
              <Card dis-hover>
                <Row>
                  <i-col :span="12">短信计费</i-col>
                  <i-col :span="12" style="text-align: right;">0.000元/条</i-col>
                </Row>
                <Row style="font-size: 24px;">
                  0.000￥
                </Row>
                <Row>
                  短信计费数： 0 条
                </Row>
                <Row>
                  <i-col :span="12">正常短信数： 0 条</i-col>
                  <i-col :span="12" style="text-align: right;">超长短信数： 0 条</i-col>
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
                  0.000￥
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
                  0.000￥
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
                  <i-col :span="12" style="text-align: right;">目标值0.000</i-col>
                </Row>
                <Row style="font-size: 24px;">
                  0.000
                </Row>
                <Row>
                  <br>
                </Row>
                <Row>
                  <i-col :span="12">总接件数： 0 件</i-col>
                  <i-col :span="12" style="text-align: right;">总揽件数： 0 件</i-col>
                </Row>
              </Card>
            </i-col>
            <i-col :span="12">
              <Card dis-hover>
                <Row>
                  <i-col :span="12">揽件抽成</i-col>
                  <i-col :span="12" style="text-align: right;">0.000元/条</i-col>
                </Row>
                <Row style="font-size: 24px;">
                  0.000￥
                </Row>
                <Row>
                  平台揽件数量： 0 件
                </Row>
                <Row>
                  <i-col :span="12">微信揽件数量： 0 条</i-col>
                  <i-col :span="12" style="text-align: right;">总揽件数量： 0 件</i-col>
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
                0.000￥
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
                0.000￥
              </Row>
            </Card>
          </Row>
          <br>
          <Row>
            <Card dis-hover>
              <Row>余额</Row>
              <Row class="error-color" style="font-size: 24px;">
                0.000￥
              </Row>
            </Card>
          </Row>
        </i-col>
      </Row>
    </div>
  </Card>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'partnerDailyReport',
  components: {
  },
  data () {
    return {
      formValidate: {
        address: '',
        daterange: ''
      },
      buttonSize: 'large'
    }
  },
  methods: {

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