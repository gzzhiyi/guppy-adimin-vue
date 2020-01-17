<template>
  <Container>
    <Row :gutter="30">
      <Col span="12">
        <h2>Text</h2>
        <Input type="text" placeholder="with a placeholder" />

        <h2>Password</h2>
        <Input type="password" v-model="model3" />

        <h2>Text Area</h2>
        <Input type="textarea" />

        <h2>Number</h2>
        <Input type="number" placeholder="仅限输入数字" />

        <h2>Disabled</h2>
        <Input type="text" value="Disabled" disabled />

        <h2>Radio</h2>
        <RadioGroup v-model="model4">
          <Radio label="香蕉" disabled></Radio>
          <Radio label="苹果"></Radio>
          <Radio label="西瓜"></Radio>
        </RadioGroup>

        <h2>Checkbox</h2>
        <CheckboxGroup v-model="model5">
          <Checkbox label="香蕉"></Checkbox>
          <Checkbox label="苹果"></Checkbox>
          <Checkbox label="西瓜"></Checkbox>
        </CheckboxGroup>
      </Col>
      <Col span="12">
        <h2>Select</h2>
        <Select v-model="model20">
          <Option value="1">苹果</Option>
          <Option value="2">雪梨</Option>
          <Option value="3">草莓</Option>
        </Select>

        <h2>Select Multiple</h2>
        <Select v-model="model21" multiple>
          <Option value="1">苹果</Option>
          <Option value="2">雪梨</Option>
          <Option value="3">草莓</Option>
        </Select>

        <h2>复合型输入框</h2>
        <Input v-model="value12">
          <Select v-model="model22" slot="prepend" style="width: 80px">
              <Option value="http">http://</Option>
              <Option value="https">https://</Option>
          </Select>
          <Select v-model="model23" slot="append" style="width: 70px">
              <Option value="com">.com</Option>
              <Option value="org">.org</Option>
              <Option value="io">.io</Option>
          </Select>
        </Input>

        <h2>Search</h2>
        <Input search placeholder="Enter something..." />

        <h2>Date</h2>
        <DatePicker type="date" placeholder="Select date"></DatePicker>

        <h2>Datetime</h2>
        <DatePicker type="datetime" placeholder="Select date"></DatePicker>

        <h2>Datetimerange</h2>
        <DatePicker type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>

        <h2>Switch</h2>
        <Switch v-model="model1" />

        <h2>Slider</h2>
        <Slider v-model="model2"></Slider>
      </Col>
    </Row>
  </Container>
</template>

<script>
  import Container from '@components/Container'

  export default {
    components: {
      Container
    },
    data () {
      return {
        model1: true,
        model2: 25,
        model3: '123',
        model4: '西瓜',
        model5: ['西瓜', '苹果'],
        model20: '',
        model21: '',
        model22: 'http',
        model23: 'com'
      }
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  h2 {
    margin: 20px 0;
    padding-left: 10px;
    font-size: 14px;
    border-left: 8px #ddd solid;
  }
</style>
