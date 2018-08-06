<template>
<div>
  <name-search v-model="asd"></name-search>
</div>
</template>
<script>
import NameSearch from '@/components/name-search'
export default {
  components: {
    NameSearch
  },
  data() {
    return {
      asd: '111'
    }
  }
}
</script>