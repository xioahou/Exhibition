<script setup>


import { Search } from '@element-plus/icons-vue'
import { getClassApi, getProductListApi } from './apis/home'
import { ref } from 'vue'
const classList = ref([])
const class_mark = ref(1)
const class_id = ref()
const total = ref(0)
const getClass = async () => {
  const res = await getClassApi()
  if (res.code === 200) {
    classList.value = res.data.list
    classList.value.unshift(
      {
        "id": 0,
        "name": "全部",
        "name_en": "All"
      },
    )
  }
}
getClass()
const selectMark = (id) => {

}
const product_list = ref([])
const searchFilter = ref({
  page: 1,
  limit: 9,
  class_id: 1,
  search: ''
})
const changeClass = async (id) => {
  searchFilter.value.class_id = id
  class_mark.value = id

  await getProductList()
}
const getProductList = async () => {
  const res = await getProductListApi(searchFilter.value)
  if (res.code === 200) {
    product_list.value = res.data.list
    total.value = res.data.total
  }

}
getProductList()
const searchProduct = () => {
  getProductList()
}
const clearGetProduct = async () => {
  searchFilter.value = {
    page: 1,
    limit: 9,
    class_id: 1,
    search: ''
  }
  await getProductList()
}
const handleSizeChange = async (val) => {
  searchFilter.value.limit = val
  await getProductList()

}
//改变页码
const handleCurrentChange = async (val) => {
  searchFilter.value.page = val
  await getProductList()
}

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const flage = ref('zh')
const changeLanguage = (val) => {
  locale.value = val;
  flage.value = val
  localStorage.setItem('lang', val)
}
const selectChange = (id) => {
  searchFilter.value.class_id = id
  getProductList()
}
console.log(import.meta.env);

</script>

<template>
  <div class="home">
    <div class="logo">
      <img src="./assets/logo.png" alt="logo">
      <div class="change_language">
        <div class="top">
          <el-button @click="changeLanguage('zh')" type="text">CH</el-button>
          <el-button @click="changeLanguage('en')" type="text">EN</el-button>
        </div>
        <div class="bomt">
          <el-link href="https://www.dideu.com/h-col-114.html" target="_blank">{{ $t('search.link') }}</el-link>
        </div>


        <!-- <a href="https://www.dideu.com/h-col-114.html" style="font-size: 16px;padding-left: 10px;box-sizing: border-box;">官网</a> -->
      </div>
    </div>

    <div class="search">
      <el-input v-model="searchFilter.search" :placeholder="$t('search.search_message')" clearable
        @clear="clearGetProduct">
        <template #append>
          <el-button :icon="Search" @click="searchProduct" />
        </template>
      </el-input>
    </div>
    <div class="product_class">
      <div class="product_class_item">
        <div class="item_title" v-for="(item, index) in classList" :key="index"
          @click="selectMark(changeClass(item.id))" :class="{ active: class_mark === item.id }">

          <p v-if="flage === 'zh'">{{ item.name }}</p>
          <p v-if="flage === 'en'">{{ item.name_en }}</p>
        </div>
        <div class="mobile_page">
          <el-select v-model="class_id" placeholder="全部" size="large" style="width: 240px" v-if="flage === 'zh'"
            clearable @change="selectChange(class_id)">
            <el-option v-for="(item, index) in classList" :key="index" :label="item.name" :value="item.id" />
          </el-select>
          <el-select v-model="class_id" placeholder="All" size="large" style="width: 240px" v-if="flage === 'en'"
            clearable @change="selectChange(class_id)" >
            <el-option v-for="(item, index) in classList" :key="index" :label="item.name_en" :value="item.id" />
          </el-select>
        </div>

      </div>

    </div>
    <div class="product_list">
      <div class="product_list_item" v-for="(item, index) in product_list" :key="index">
        <template v-if="flage === 'zh'">
          <h5>{{ item.name }}</h5>
          <p>Name: <span>{{ item.name_en }}</span></p>
          <p>CAS: <span>{{ item.cas }}</span></p>
          <span class="tag">{{ item.class_name }}</span>
        </template>
        <template v-if="flage === 'en'">
          <h5>{{ item.name_en }}</h5>
          <!-- <p>Name: <span>{{ item.name_en }}</span></p> -->
          <p>CAS: <span>{{ item.cas }}</span></p>
          <span class="tag">{{ item.class_name_en }}</span>
        </template>
      </div>
    </div>
    <el-pagination v-model:page-size="searchFilter.limit" :disabled="disabled" :background="background"
      layout=" prev, pager, next" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />

    <div class="footer_nav">
      <p>Copyright © 2025 陕西缔都医药化工</p>
    </div>
  </div>
</template>

<style scoped lang="less">

.home {
  .logo {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    padding-left: 50px;
    padding-right: 50px;
    box-sizing: border-box;
    width: 100%;
    height: 100px;

    .el-button {
      font-size: 20px;
    }

    img {
      width: 150px;
      height: 100%;
    }

    .change_language {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .bomt {
        height: 30px;
        padding: 0 10px;
        background-color: #1E50AE;
        line-height: 30px;
        text-align: center;
        border-radius: 15px;

        .el-link {
          font-size: 12px;
          color: #ffffff;
        }
      }
    }
  }

  .search {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    // width:400px;
    :deep(.el-input) {
      outline: none;
      width: 400px;
      height: 50px;

      .el-input-group__append {
        background-color: #1E50AE;
        width: 60px;
        font-size: 20px;

        .el-icon {
          color: #ffffff;
        }
      }
    }
  }

  .product_class {
    margin-top: 20px;

    .product_class_item {
      display: flex;
      justify-content: center;
      gap: 20px;

      .item_title {
        text-align: center;
        height: 35px;
        line-height: 35px;
        padding: 0 15px;
        box-sizing: border-box;
        cursor: pointer;

        p {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
        }
      }

      .mobile_page {
        display: none;

  
      }

      .active {
        background-color: #1E50AE;
        border-radius: 20px;
        color: #ffffff;
      }
    }
  }

  .product_list {
    padding: 40px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-row-gap: 20px;
    grid-column-gap: 20px;

    .product_list_item {
      padding: 10px;
      box-sizing: border-box;
      // width: 350px;
      height: 200px;
      border: 1px solid #ccc;
      line-height: 35px;
.tag{
  height: 40px;
  // width:100px;
  padding:5px;
  border-radius:10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  // background-color: #1E50AE;
}
      h5 {
        font-size: 18px;
        font-weight: 700;
      }

      p {
        font-size: 16px;
      }
    }
  }

  .el-pagination {
    justify-content: center;
  }

  .footer_nav {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    height: 200px;
    width: 100%;
    color: #ffffff;
  }

  @media (max-width: 520px) {
    .logo {
      justify-content: space-between;
      padding-left: 20px;
      padding-right: 20px;
    }

    .product_class {
      .product_class_item {
        gap: 2px;

        .item_title {
          padding: 0 5px;
          display: none;

          p {
            font-size: 13px;
            font-weight: 400;
            //  line-height: 30px;
          }
        }

        .mobile_page {
          display: block;
        }
      }
    }

    .search {
      .el-input {

        width: 350px;
      }
    }

    .product_list {
      padding: 20px 10px;
    }
  }

  // @media(max-width:440px) {
  //   .product_class {
  //     .product_class_item {
  //       gap: 2px;

  //       .item_title {
  //         padding: 0 5px;

  //         p {
  //           font-size: 13px;
  //           font-weight: 400;
  //            line-height: 15px;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
