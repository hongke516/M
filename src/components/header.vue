<template>
    <div class="m-header">
        {{title}}
    </div>
</template>
<script>
    export default {
        name: 'mHeader',
        props: {
            title:  {
                type: String,
                default: '佰米智能'
            },
        }
    }
</script>
<style scoped lang="less">
    @import '../theme/var.less';
    .m-header{
        background: @head-bg-color;
        font-size: 18px;
        padding: 0 50px;
        height: 64px;
        line-height: 64px;
        color: @head-font-color;
    }
</style>