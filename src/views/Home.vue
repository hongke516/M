<template>
  <div class="home">
    <Row style="width: 100%" :gutter="16">
      <i-col span="8">
        <Card>
          <p slot="title" class="card-title">
            派件概览
          </p>
          <div>
            <div class="error-title content-item">异常件数量： 100</div>
            <Row :gutter="8">
              <i-col class="content-item" :span="12">滞留1天： 20</i-col>
              <i-col class="content-item" :span="12">滞留2天： 20</i-col>
            </Row>
            <Row :gutter="8">
              <i-col class="content-item" :span="12">滞留3天： 30</i-col>
              <i-col class="content-item" :span="12">滞留4天： 30</i-col>
            </Row>
          </div>
        </Card>
      </i-col>
      <i-col span="8">
        <Card>
          <p slot="title" class="card-title">
            揽件概览
          </p>
          <div>
            <div class="error-title content-item">平台揽件未支付： 100</div>
            <div class="error-title content-item">平台揽件未移交： 100</div>
            <div class="error-title content-item">微信揽件未移交： 100</div>
          </div>
        </Card>
      </i-col>
      <i-col span="8">
        <Card>
          <p slot="title" class="card-title">
            兼职概览
          </p>
          <div>
            <div style="height: 27px;line-height: 27px;" class="error-title content-item">本日兼职占比： 100</div>
            <Row :gutter="8">
              <i-col :span="12">本日兼职费用： 20</i-col>
              <i-col :span="12">本日派件收入： 20</i-col>
            </Row>
            <div style="height: 27px;line-height: 27px;" class="error-title">本月兼职占比： 100</div>
            <Row :gutter="8">
              <i-col :span="12">本月兼职费用： 30</i-col>
              <i-col :span="12">本月派件收入： 30</i-col>
            </Row>
          </div>
        </Card>
      </i-col>
    </Row>
    <Card style="margin-top: 8px;">
      <Form ref="formValidate" :model="formValidate" :inline="true" :label-width="80">
        <FormItem label="网点" prop="address">
          <i-select v-model="formValidate.address" placeholder="Select your city">
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
        <FormItem>
          <Button type="primary">搜索</Button>
        </FormItem>
      </Form>
      <Table :data="tableData" :columns="tableColumns" border stripe></Table>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      formValidate: {
        address: '',
        daterange: ''
      },
      tableData: [],
      tableColumns: [
        {
          title: '揽件',
          align: 'center',
          children: [
            {
              title: '快递公司',
              key: 'name'
            },
            {
              title: '揽件数量',
              key: 'name'
            },
            {
              title: '揽件收入',
              key: 'name'
            },
            {
              title: '未移交数',
              key: 'name'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>

<style scoped lang="less">
  @import "../theme/var.less";
  .error-title{
    font-size: 16px;
    color: @error-color;
  }
  .content-item{
    height: 32px;
    line-height: 32px;
  }
</style>
