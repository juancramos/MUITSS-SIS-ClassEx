<template>
  <div>
    <div class="card">
      <div class="card-content">
        <neighbors />
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <visitCards />
      </div>
    </div>
    <div class="card">
      <div class="card-content">
        <invoices />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import neighbors from '@/components/neighbors.vue'
import visitCards from '@/components/visit-cards.vue'
import invoices from '@/components/invoices.vue'

export default {
  name: 'home',
  components: {
    neighbors,
    visitCards,
    invoices
  }
}
</script>
