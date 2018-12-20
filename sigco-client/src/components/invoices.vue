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
 <section>
        <div class="block">
            <b-checkbox v-for="item in visits" :key="item.id" v-model="selVisits"
            :native-value="item.id">
                {{ item.description }}
            </b-checkbox>
        </div>
    </section>
                <span class="error" v-show="errors['visit']">{{ errors["visit"] }}</span>
                   <b-field label="Grand total">
                  <b-input
                      name="grandTotal"
                      v-model="grandTotal"
                      type="name">
                  </b-input>
                </b-field>
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
          $sort: {createdAt: -1},
          paid: 0
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
      selVisits: [],
      errors: {},
      grandTotal: 0,
      columns: [
        {
            field: 'id',
            label: 'ID'
        },
        {
            field: 'grandTotal',
            label: 'total'
        }
      ]
    }
  },
  methods: {
    ...mapActions('invoices', { findInvoices: 'find' }),
    ...mapActions('visit-cards', { findVisits: 'find' }),
    ...mapActions('visit-cards', { updateVisit: 'patch' }),
    ...mapActions('invoices', { createInvoice: 'create' }),
    ...mapActions('neighbors', { findneighborss: 'find' }),
    save() {
      if (this.validateForm()) {       
        const nId = this.neighbors.find(x => x.DNI === this.DNI).id
        if (!nId) {
          this.errors['DNI'] = 'neighbor not found'
          return
        }
        this.createInvoice({
          grandTotal: this.grandTotal,
          neighborId: nId
        }).then((data) => {
          this.showTrips = true
          this.username = ''
          this.selVisits.map(x => {
            this.updateVisit([x, {
              invoiceId: data.id
            }, {}]).catch(err => {
              this.errors = {}
              this.errors['username'] = err
            })
          })
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
  watch:{
    selVisits(selected) {
      let total = 0
      selected.map(x => {
        const v = this.visits.find(y => y.id === x)
        total = v ? total + v.cost : total
      })
      this.grandTotal = total
    }
  },
  mounted() {
    this.findVisits({
      query: {
        paid: 0
      }
    }).catch(error => console.log(error))
    this.findInvoices().catch(error => console.log(error))
  }
}
</script>
