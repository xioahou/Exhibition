<script setup>
import { Search } from '@element-plus/icons-vue'
import { getLanguageListApi, getProductListApi, getProductApi, getOpenPageApi } from './apis/home'
import { onMounted, ref, nextTick } from 'vue'
import { setLang, getLang } from './utils/local.js'
import { ElMessage } from 'element-plus'
const languageList = ref([])
const localLang = getLang()
console.log(localLang);
async function getLanguageList() {
  const res = await getLanguageListApi()
  console.log(res);
  if (res.code === 200) {
    languageList.value = res.data
    const firstLang = localLang || languageList.value[0]//根据语言列表来获取第一个语言
    console.log(firstLang);

    if (firstLang) {
      await changeLang(firstLang)
    }
  } else {
    ElMessage.error(res.msg)
  }

}


getLanguageList()

const querParams = ref({
  class_id: 0,
  search: "",
  page: 1,
  limit: 9
})
const total = ref(0)
const input = ref('')
//点击切换语言
const language = ref(localLang?.short_name || 'zh-Cn') //调用接口传的值区分语言
const allTiags = ref(localLang?.category_display_name || '全部')
const currentFlag = ref(localLang?.icon || 'https://flagcdn.com/w40/cn.png') //导航栏国旗
const currentLang = ref(localLang?.display_name || '简体中文') //导航栏渲染当前的语言
const websiteLang = ref(localLang?.jump_website || '官方网站') //跳转官方网站语言
const logoTitle = ref(localLang?.company_name || '陕西缔都医药化工有限公司') //logo傍边的标题
const inputText = ref(localLang?.search_placeholder || '输入产品名称/CAS搜索')
const bigTitle = ref(localLang?.promote_title || '产品服务')//推广大标题
const smallTitle = ref(localLang?.promote_subtitle || '我们提供定制合成服务，提供从小试研发、中试放大至产业化生产的一站式服务。')
const copyright = ref(localLang?.copyright || 'Copyright @ 2025 陕西缔都医药化工')
const classifyList = ref([])
async function getProductList(item = 'zh-Cn') {
  const res = await getProductListApi(item)
  if (res.code === 200) {
    classifyList.value = res.data
    classifyList.value.unshift({
      id: 0,
      name: allTiags.value
    })
  } else {
    ElMessage.error(res.msg)
  }
}
getProductList(language.value)
async function changeLang(item) {
  console.log(item);
  setLang(item)
  currentFlag.value = item.icon
  currentLang.value = item.display_name
  websiteLang.value = item.jump_website
  logoTitle.value = item.company_name
  inputText.value = item.search_placeholder
  bigTitle.value = item.promote_title
  smallTitle.value = item.promote_subtitle
  language.value = item.short_name
  allTiags.value = item.category_display_name
  copyright.value = item.copyright
  await getProductList(item.short_name)
  await classisySearch(querParams.value)
}
const current_classify = ref(1)
const productList = ref([])
async function classisySearch(item) {
  console.log(item);

  current_classify.value = item.id ?? item.class_id
  querParams.value.class_id = item.id ?? item.class_id
  const res = await getProductApi(querParams.value, language.value)
  if (res.code === 200) {
    productList.value = res.data.list
    total.value = res.data.total
  } else {
    ElMessage.error(res.msg)
  }
}
async function onClassClick(item) {
  console.log('分类');

  querParams.value.page = 1
  await classisySearch(item)
}
classisySearch(querParams.value)
function onSearchClick() {
  querParams.value.search = input.value
  classisySearch(querParams.value)
}
async function handleSizeChange(val) {
  querParams.value.limit = val
  await classisySearch(querParams.value)
}
async function handleCurrentChange(val) {
  querParams.value.page = val
  await classisySearch(querParams.value)
}
async function getOpenPage() {
  const res = await getOpenPageApi()
  if (res.code !== 200) {
    console.log(res.msg);
    return
  }
}
getOpenPage()
const targetWebEn = ref('https://www.dideu.com/en/')
const targetWebZh = ref('https://www.dideu.com/')
</script>

<template>
  <div class="dideu_home">
    <section class="dideu_home_langule padBanxin">
      <div class="langule_change banxin">
        <div class="flag">
          <img :src="currentFlag" style="width: 20px;height: 13px;" />
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ currentLang }}
            <i class="iconfont icon-xiajiantou"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in languageList" @click="changeLang(item)">{{ item.display_name
              }}</el-dropdown-item>
              <!-- <el-dropdown-item>中国</el-dropdown-item>
              <el-dropdown-item>俄罗斯</el-dropdown-item> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <i class="fengexian">|</i>
        <a class="web_link" :href="language === 'zh-CN' ? targetWebZh : targetWebEn" target="blank">{{ websiteLang
        }}</a>
      </div>
    </section>
    <section class="dideu_home_search padBanxin">
      <div class="logo_search banxin">
        <div class="logo">
          <img src="./assets//searchLogo.png" alt="">
          <h1>{{ logoTitle }}</h1>
        </div>
        <div class="search">
          <el-input v-model="input" style="width: 240px" :placeholder="inputText">
            <template #suffix>
              <el-icon @click="onSearchClick" style="cursor: pointer;">
                <Search />
              </el-icon>
            </template>
          </el-input>
        </div>
      </div>
    </section>
    <section class="dideu_home_banner padBanxin">
      <div class="banner banxin">
        <div class="banner_title">
          <div class="title">
            {{ bigTitle }}
          </div>
          <div class="sub_title">
            {{ smallTitle }}
          </div>
        </div>
      </div>
    </section>
    <section class="dideu_home_content padBanxin">
      <div class="product_content banxin">
        <div class="product_nav">
          <ul class="nav">
            <li :class="{ action: current_classify === item.id }" v-for="(item, index) in classifyList" :key="index"
              @click="onClassClick(item)"><span class="text">{{ item.name
              }}</span>
            </li>

          </ul>
        </div>
        <div class="product_list">
          <div class="product_item" v-for="(item, index) in productList" :key="index">
            <h5 class="item_title">{{ item.name }}</h5>
            <div class="classify">{{ item.class_name }}</div>
            <p class="desc" v-if="item.name_en">{{ item.name_en }}</p>
            <p class="cas">CAS: {{ item.cas }}</p>
          </div>
        </div>
      </div>
      <el-pagination background layout="prev, pager, next" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" v-model:current-page="querParams.page" :page-size="querParams.limit" />
    </section>
    <section class="dideu_home_copyright">
      <div class="copyright_nav banxin">
        {{ copyright }}
      </div>
    </section>
  </div>
</template>
<style scoped lang="less">
.dideu_home {
  width: 100%;
  height: 100vh;
  background-color: #F7F7F7;

  :deep(&_langule) {
    height: 30px;
    background: #004DB5;
    display: flex;
    justify-content: center;

    .langule_change {
      display: flex;
      justify-content: end;

      .el-dropdown {
        cursor: pointer;

        .el-dropdown-link {
          line-height: 30px;
          font-size: 12px;
          outline: none;
          color: #FFFFFF;

          .iconfont {
            color: #FFFFFF;
            font-size: 10px;
          }
        }


      }

      .flag {
        display: flex;
        align-items: center;
        margin-right: 10px;
      }

      .fengexian {
        line-height: 30px;
        color: #FFFFFF;
        margin: 0 30px;
      }

      .web_link {
        font-size: 12px;
        color: #FFFFFF;
        line-height: 30px;
      }
    }
  }

  :deep(&_search) {
    display: flex;
    justify-content: center;
    height: 90px;
    background-color: #ffffff;

    .logo_search {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .logo {
        display: flex;
        justify-content: start;
        align-items: center;

        h1 {
          margin-left: 20px;
          font-size: 32px;
          color: #111111;
          font-family: PingFang SC, PingFang SC;
          font-style: normal;
          line-height: 22px;
          font-weight: bold;
        }
      }

      .search {
        .el-input {
          height: 40px;
          width: 450px !important;

          .el-input__wrapper {
            padding-left: 20px;
            border-radius: 22px;

            .el-input__inner {
              font-size: 16px;
              color: #999999;
            }

            .el-input__suffix {
              margin-right: 20px;
              font-size: 24px;
              color: #000;
            }
          }
        }
      }
    }
  }

  :deep(&_banner) {
    display: flex;
    justify-content: center;
    height: 311px;
    background-image: url('./assets/banner.png');
    background-position: center center;
    /* 背景居中 */
    background-repeat: no-repeat;
    /* 不平铺 */
    background-size: cover;

    /* 保持比例铺满容器 */
    .banner_title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;

      .title {
        font-weight: 800;
        font-size: 36px;
        color: #404040;
      }

      .sub_title {
        margin-top: 40px;
        font-weight: 500;
        font-size: 18px;
        color: #000000;
      }
    }
  }

  :deep(&_content) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    background-color: #F7F7F7;

    .product_content {
      display: flex;
      gap: 20px;

      .product_nav {
        .nav {
          width: 240px;
          background-color: #FFFFFF;

          li {
            display: flex;
            width: 240px;
            align-items: center;
            height: 50px;
            padding-left: 10px;
            box-sizing: border-box;
            font-size: 16px;
            font-weight: 400;
            color: #111111;
            line-height: 20px;
            cursor: pointer;

            .text {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              flex: 1;
            }


            &.action {
              display: flex;
              justify-content: space-between;
              height: 50px;
              background-color: #E6EFFA;
              color: #004DB5;
              font-weight: bold;
              font-size: 18px;

              &::after {
                content: "";
                display: block;
                width: 4px;
                height: 33px;
                background-color: #004DB5;
              }
            }
          }
        }
      }

      .product_list {
        flex: 1;
        width: 100%;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        flex-shrink: 0;

        .product_item {
          padding: 20px;
          box-sizing: border-box;
          border-radius: 10px;
          width: 300px;

          height: 270px;
          background-color: #FFFFFF;
          background-image: url("./assets/group.png");
          background-size: auto;
          background-repeat: no-repeat;
          background-position: right bottom;

          .item_title {
            max-width: 300px;
            font-weight: 400;
            font-size: 18px;
            color: #000000;
            line-height: 23px;
            white-space: normal;
            word-break: break-all;
          }

          .classify {
            display: inline-block;
            max-width: 300px;
            margin: 20px 0;
            padding: 0 15px;
            box-sizing: border-box;
            min-height: 32px;
            height: auto;
            background: #E6EFFA;
            border-radius: 8px;
            line-height: 32px;
            text-align: center;
            font-size: 14px;
            color: #0D6CE4;
            white-space: normal;
            word-break: break-all;
          }

          .desc {
            margin-bottom: 20px;
            max-width: 300px;
            font-size: 14px;
            color: #666666;
            white-space: normal;
            word-break: break-all;
          }

          .cas {
            font-size: 16px;
            color: #000000;
            white-space: normal;
            word-break: break-all;
          }
        }
      }
    }

    .el-pagination {
      margin-top: 60px;

      .el-pager {

        .btn-prev {
          background: transparent;
          color: #18191A;
        }

        .btn-next {
          background: transparent;
        }

        .number {
          border: 1px solid #ccc;
          background-color: transparent;
          font-size: 12px;

          &.is-active {
            background-color: #004db5;
          }
        }
      }
    }

  }

  &_copyright {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    height: 100px;
    width: 100%;
    background: #004DB5;

    .copyright_nav {
      text-align: center;
      line-height: 100px;
      font-size: 16px;
      color: #FFFFFF;
    }
  }
}

.banxin {
  max-width: 1200px;
  width: 100%;

  margin: 0 auto;
}
</style>
