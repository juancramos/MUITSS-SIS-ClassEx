<template>
  <div class="columns">
    <div class="column">
      <form action="" @submit.prevent="save">
        <div class="material-card-content">
          <p class="title">Create a new visit card</p>
          <section class="modal-card-body">
            <b-field label="Set the neighbor DNI">
              <b-input
                  name="DNI"
                  v-model="DNI"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['DNI']">{{ errors["DNI"] }}</span>
            <b-field label="Pick a date">
              <b-datepicker v-model="date" :date-formatter="(date) => date.toUTCString()">
              </b-datepicker>
            </b-field>
            <span class="error" v-show="errors['date']">{{ errors["date"] }}</span>
            <b-field label="Set the visit description">
              <b-input
                  name="description"
                  v-model="description"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['description']">{{ errors["description"] }}</span>
            <b-field label="Set the visit cost">
              <b-input
                  name="cost"
                  v-model="cost"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['cost']">{{ errors["cost"] }}</span>
            <b-field label="Set the admin full name">
              <b-input
                  name="adminUsername"
                  v-model="adminUsername"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['adminUsername']">{{ errors["adminUsername"] }}</span>
            <b-field label="has the visit been paid?">
              <b-switch v-model="isPaid">
                  {{ isPaid }}
              </b-switch>
            </b-field>
          </section>
        </div>
        <div class="content has-text-centered">
          <p>
            <button class="button is-primary">
              Create new visit
            </button>
          </p>
        </div>
      </form>
    </div>
    <div class="column">
      <div class="content has-text-centered">
        <p>
          <template>
            <b-table :data="visit_cards">
              <template slot-scope="props">
                <b-table-column field="id" label="Id" sortable>
                  {{ props.row.id }}
                </b-table-column>

                <b-table-column field="date" label="date" sortable>
                  {{ props.row.date }}
                </b-table-column>
                <b-table-column field="description" label="description" sortable>
                  {{ props.row.description }}
                </b-table-column>
                <b-table-column field="adminUsername" label="adminUsername" sortable>
                  {{ props.row.adminUsername }}
                </b-table-column>
                <b-table-column field="paid" label="paid" sortable>
                  {{ props.row.paid }}
                </b-table-column>
                <b-table-column field="" label="" v-show="props.row.paid === false || props.row.paid === 0">
                  <button class="button is-primary is-small" 
                  @click="payVisit(props.row.id)">
                    <span>Pay </span>
                    <b-icon pack="fas" icon="angle-right">
                    </b-icon>
                  </button>
                </b-table-column>
              </template>
            </b-table>
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'visit_cards',
  computed: {
    ...mapGetters('visit-cards', { findvisit_cardsInStore: 'find' }),
    ...mapGetters('neighbors', { findneighborsInStore: 'find' }),
    visit_cards () {
      const visit_cardss = this.findvisit_cardsInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      // if (this.mothervisit_cardss){
      //   visit_cardss.data.map(x => {
      //     let origin = this.mothervisit_cardss.find(m => m.id === x.origin_mothervisit_cards)
      //     if (origin) x = Object.assign(x, { origin: origin.name })
      //     let destiny = this.mothervisit_cardss.find(m => m.id === x.destiny_mothervisit_cards)
      //     if (destiny) x = Object.assign(x, { destiny: destiny.name })
      //   })
      // }
      return visit_cardss && visit_cardss.data ? visit_cardss.data : []
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
      date: null,
      DNI: null,
      description: null,
      cost: null,
      adminUsername: null,
      isPaid: false,
      errors: {}
    }
  },
  methods: {
    ...mapActions('visit-cards', { findvisit_cardss: 'find' }),
    ...mapActions('visit-cards', { createvisit_cards: 'create' }),
    ...mapActions('neighbors', { findneighborss: 'find' }),
    ...mapActions('visit-cards', { updateVisit: 'patch' }),
    save() {
      if (this.validateForm()) {
        const nId = this.neighbors.find(x => x.DNI === this.DNI).id
        if (!nId) {
          this.errors['DNI'] = 'neighbor not found'
          return
        }
        this.createvisit_cards({
          date: this.date,
          DNI: this.DNI,
          description: this.description,
          cost: this.cost,
          city: this.city,
          adminUsername: this.adminUsername,
          paid: this.isPaid,
          neighborId: nId
        }).then(() => {
        }).catch(err => {
          this.errors = {}
          this.errors['DNI'] = err
        })
      }
    },
    validateForm() {
      this.errors = {}
 
      return Object.keys(this.errors).length === 0
    },
    payVisit(id) {
       this.updateVisit([id, {
              paid: true
            }, {}]).catch(err => {
              console.log(err)
              this.errors = {}
              this.errors['username'] = err
            })
    }
  },
  created() {
    this.findvisit_cardss().catch(error => console.log(error))
    this.findneighborss().catch(error => console.log(error))
  }
}
</script>
