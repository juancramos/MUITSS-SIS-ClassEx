<template>
  <div class="columns">
    <div class="column">
      <form action="" @submit.prevent="save">
        <div class="material-card-content">
          <p class="title">Create a new neighbor</p>
          <section class="modal-card-body">
            <b-field label="Type the neighbor name">
              <b-input
                  name="name"
                  v-model="name"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['name']">{{ errors["name"] }}</span>
            <b-field label="Set the neighbors DNI">
              <b-input
                  name="DNI"
                  v-model="DNI"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['DNI']">{{ errors["DNI"] }}</span>
            <b-field label="Set the neighbor address">
              <b-input
                  name="address"
                  v-model="address"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['address']">{{ errors["address"] }}</span>
            <b-field label="Set the neighbor ZIP Code">
              <b-input
                  name="ZIPCode"
                  v-model="ZIPCode"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['ZIPCode']">{{ errors["ZIPCode"] }}</span>
            <b-field label="Set the neighbor city">
              <b-input
                  name="city"
                  v-model="city"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['city']">{{ errors["city"] }}</span>
            <b-field label="Set the neighbor phone number">
              <b-input
                  name="phoneNumber"
                  v-model="phoneNumber"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['phoneNumber']">{{ errors["phoneNumber"] }}</span>
            
          </section>
        </div>
        <div class="content has-text-centered">
          <p>
            <button class="button is-primary">
              Create new neighbor
            </button>
          </p>
        </div>
      </form>
    </div>
    <div class="column">
      <div class="content has-text-centered">
        <p>
          <template>
            <b-table :data="neighbors" :columns="columns"></b-table>
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'neighbors',
  computed: {
    ...mapGetters('neighbors', { findneighborsInStore: 'find' }),
    neighbors () {
      const neighborss = this.findneighborsInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      // if (this.motherneighborss){
      //   neighborss.data.map(x => {
      //     let origin = this.motherneighborss.find(m => m.id === x.origin_motherneighbors)
      //     if (origin) x = Object.assign(x, { origin: origin.name })
      //     let destiny = this.motherneighborss.find(m => m.id === x.destiny_motherneighbors)
      //     if (destiny) x = Object.assign(x, { destiny: destiny.name })
      //   })
      // }
      return neighborss && neighborss.data ? neighborss.data : []
    }
  },
  data() {
    return {
      name: null,
      DNI: null,
      address: null,
      ZIPCode: null,
      city: null,
      phoneNumber: null,
      errors: {},
      columns: [
        {
            field: 'id',
            label: 'ID'
        },
        {
            field: 'name',
            label: 'neighbors name',
        },
        {
            field: 'DNI',
            label: 'DNI',
        },
        {
            field: 'address',
            label: 'address',
        },
        {
            field: 'ZIPCode',
            label: 'ZIPCode',
        },
        {
            field: 'city',
            label: 'city',
        },
        {
            field: 'phoneNumber',
            label: 'phoneNumber',
        }
      ]
    }
  },
  methods: {
    ...mapActions('neighbors', { findneighborss: 'find' }),
    ...mapActions('neighbors', { createneighbors: 'create' }),
    save() {
      if (this.validateForm()) {
        this.createneighbors({
          name: this.name,
          DNI: this.DNI,
          address: this.address,
          ZIPCode: this.ZIPCode,
          city: this.city,
          phoneNumber: this.phoneNumber
        }).then(() => {

        }).catch(err => {
          this.errors = {}
          this.errors['name'] = err
        })
      }
    },
    validateForm() {
      this.errors = {}
      if (!this.name) {
        this.errors['name'] = 'neighbors name is required'
      }
      if (!this.DNI) {
        this.errors['DNI'] = 'neighbors DNI is required'
      }
      if (!this.address) {
        this.errors['address'] = 'neighbors address is required'
      }
      if (!this.ZIPCode) {
        this.errors['ZIPCode'] = 'neighbors ZIPCode is required'
      }
      if (!this.city) {
        this.errors['city'] = 'neighbors city is required'
      }
      if (!this.phoneNumber) {
        this.errors['phoneNumber'] = 'neighbors phoneNumber is required'
      }
      return Object.keys(this.errors).length === 0
    }
  },
  created() {
    this.findneighborss().catch(error => console.log(error))
  }
}
</script>
