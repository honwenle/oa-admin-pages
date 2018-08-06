<template>
  <div>
    <entry-form :id="id" :token="token" isComplete></entry-form>
  </div>
</template>
<script>
import EntryForm from './entry-form'
export default {
  components: {
    EntryForm
  },
  data() {
    return {
      id: parseInt(this.$route.params.id),
      token: this.$route.query.token
    }
  }
}
</script>
