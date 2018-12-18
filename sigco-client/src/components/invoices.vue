<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <form action="" @submit.prevent="save">
              <div class="material-card-content">
                <p class="title"> Create invoice</p>            
                <b-field label="Set the neighbor DNI">
                  <b-input
                      name="DNI"
                      v-model="DNI"
                      type="name">
                  </b-input>
                </b-field>
                <span class="error" v-show="errors['DNI']">{{ errors["DNI"] }}</span>
                <b-field label="Select visit card to relate in this invoice">
                  <b-select placeholder="Select" v-model="visit" expanded>
                    <option v-for="item in visits" :key="item.id" :value="item.id"> {{ item.id }}</option>
                  </b-select>
                </b-field>
                <span class="error" v-show="errors['visit']">{{ errors["visit"] }}</span>
              </div>
              <div class="content has-text-centered">
                <p>
                  <button class="button is-primary">
                    Show tip information
                  </button>
                </p>
              </div>
            </form>
          </div>
          <div class="column">
            <div class="content has-text-centered">
              <p>
                <b-table :data="invoices" :columns="columns"></b-table>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'invoices',
  computed: {
    ...mapGetters('invoices', { findInvoicesInStore: 'find' }),
    ...mapGetters('visit-cards', { findVisitsInStore: 'find' }),
    ...mapGetters('neighbors', { findneighborsInStore: 'find' }),
    invoices () {
      const invoices = this.findInvoicesInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      return invoices && invoices.data ? invoices.data : []
    },
    visits () {
      const visits = this.findVisitsInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      return visits && visits.data ? visits.data : []
    },
    neighbors () {
      const neighborss = this.findneighborsInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      return neighborss && neighborss.data ? neighborss.data : []
    }
  },
  data() {
    return {
      DNI: null,
      visit: null,
      errors: {},
      columns: [
        {
            field: 'id',
            label: 'ID'
        }
      ]
    }
  },
  methods: {
    ...mapActions('invoices', { findInvoices: 'find' }),
    ...mapActions('visit-cards', { findVisits: 'find' }),
    ...mapActions('invoices', { createInvoice: 'create' }),
    ...mapActions('neighbors', { findneighborss: 'find' }),
    save() {
      if (this.validateForm()) {       
        const nId = this.neighbors.find(x => x.DNI === this.DNI).id
        if (!nId) {
          this.errors['DNI'] = 'neighbor not found'
          return
        }
        const gTotal = this.visits.reduce(function (total, x) {
          return total + x.cost;
        });
        this.createInvoice({
          grandTotal: gTotal,
          neighborId: nId
        }).then(() => {
          this.initializeQuery({ shipId: this.visit, updatedAt: this.date.toISOString() })
          this.showTrips = true
          this.username = ''
        }).catch(err => {
          this.errors = {}
          this.errors['username'] = err
        })
      }
    },
    validateForm() {
      this.errors = {}
      return Object.keys(this.errors).length === 0
    }
  },
  mounted() {
    this.findVisits({
      paid: false
    }).catch(error => console.log(error))
    this.findInvoices().catch(error => console.log(error))
  }
}
</script>
