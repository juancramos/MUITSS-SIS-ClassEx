<template>
  <div>
    <div class="card">
      <div class="card-content">
        <course />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import course from '@/components/course.vue'

export default {
  name: 'courses',
  components: {
    course
  }
}
</script>
