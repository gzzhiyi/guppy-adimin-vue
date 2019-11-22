<template>
  <div
    ref="scrollCon"
    class="tags"
  >
    <div class="tags__option">
      <Dropdown transfer @on-click="handleTagsOption">
        <Button size="small" type="primary">
          标签选项
          <Icon type="md-arrow-dropdown" />
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="clearAll">关闭所有</DropdownItem>
          <DropdownItem name="clearOthers">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="tag__body">
      <Tag
        type="dot"
        v-for="item in pageTagsList"
        :key="item.name"
        :name="item.name"
        @on-close="closePage"
        @click.native="linkTo(item)"
        :closable="item.name !== 'home'"
        :color="item.children ? (item.children[0].name === currentPageName ? 'blue' : 'default') : (item.name === currentPageName ? 'blue' : 'default')"
      >
        {{ item.title }}
      </Tag>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tagsPageOpened',
    data () {
      return {
        currentPageName: this.$route.name,
        tagBodyLeft: 0,
        refsTag: [],
        tagsCount: 1
      }
    },
    props: {
      pageTagsList: Array,
      beforePush: {
        type: Function,
        default: (item) => {
          return true
        }
      }
    },
    computed: {
      title () {
        return this.$store.state.app.currentTitle
      },
      tagsList () {
        return this.$store.state.app.pageOpenedList
      }
    },
    methods: {
      closePage (event, name) {
        let pageOpenedList = this.$store.state.app.pageOpenedList
        let lastPageObj = pageOpenedList[0]
        if (this.currentPageName === name) {
          let len = pageOpenedList.length
          for (let i = 1; i < len; i++) {
            if (pageOpenedList[i].name === name) {
              if (i < (len - 1)) {
                lastPageObj = pageOpenedList[i + 1]
              } else {
                lastPageObj = pageOpenedList[i - 1]
              }
              break
            }
          }
        } else {
          let tagWidth = event.target.parentNode.offsetWidth
          this.tagBodyLeft = Math.min(this.tagBodyLeft + tagWidth, 0)
        }
        this.$store.commit('removeTag', name)
        this.$store.commit('closePage', name)
        pageOpenedList = this.$store.state.app.pageOpenedList
        localStorage.pageOpenedList = JSON.stringify(pageOpenedList)
        if (this.currentPageName === name) {
          this.linkTo(lastPageObj)
        }
      },
      linkTo (item) {
        let routerObj = {}
        routerObj.name = item.name
        if (item.argu) {
          routerObj.params = item.argu
        }
        if (item.query) {
          routerObj.query = item.query
        }
        if (this.beforePush(item)) {
          this.$router.push(routerObj)
        }
      },
      handleTagsOption (type) {
        if (type === 'clearAll') {
          this.$store.commit('clearAllTags')
          this.$router.push({
            name: 'home'
          })
        } else {
          this.$store.commit('clearOtherTags', this)
        }
        this.tagBodyLeft = 0
      }
    },
    watch: {
      '$route' (to) {
        this.currentPageName = to.name
      }
    }
  }
</script>

<style lang="less" scoped>
  .tags {
    position: relative;
    padding-right: 120px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    &__body {
      position: absolute;
      padding: 2px 10px;
      overflow: visible;
      white-space: nowrap;
      transition: left .3s ease;
    }
    &__option {
      position: absolute;
      z-index: 1;
      top: 0;
      right: 0;
      width: 110px;
      height: 100%;
      padding-top: 8px;
      text-align: center;
      box-sizing: border-box;
    }
  }
</style>