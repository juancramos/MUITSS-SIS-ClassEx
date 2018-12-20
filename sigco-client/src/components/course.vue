<template>
  <div class="columns">
    <div class="column">
      <form action="" @submit.prevent="save">
        <div class="material-card-content">
          <p class="title">Create a new course</p>
          <section class="modal-card-body">
            <b-field label="Type the course name">
              <b-input
                  name="name"
                  v-model="name"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['name']">{{ errors["name"] }}</span>
            <b-field label="Set the courses time (in hours)">
              <b-input
                  name="time"
                  v-model="time"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['time']">{{ errors["time"] }}</span>
            <b-field label="Set the course total cost">
              <b-input
                  name="cost"
                  v-model="cost"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['cost']">{{ errors["cost"] }}</span>
            <b-field label="Set the course total capacity">
              <b-input
                  name="capacity"
                  v-model="capacity"
                  type="name">
              </b-input>
            </b-field>
            <span class="error" v-show="errors['capacity']">{{ errors["capacity"] }}</span>
            <b-field label="Pick a start date">
              <b-datepicker v-model="from" :date-formatter="(from) => from.toUTCString()" position="is-top-right">
              </b-datepicker>
            </b-field>
            <span class="error" v-show="errors['from']">{{ errors["from"] }}</span>
            <b-field label="Pick an end date">
              <b-datepicker v-model="to" :date-formatter="(to) => to.toUTCString()" position="is-top-right">
              </b-datepicker>
            </b-field>
            <span class="error" v-show="errors['to']">{{ errors["to"] }}</span>
          </section>
        </div>
        <div class="content has-text-centered">
          <p>
            <button class="button is-primary">
              Create new course
            </button>
          </p>
        </div>
      </form>
    </div>
    <div class="column">
      <div class="content has-text-centered">
        <p>
          <template>
            <b-table :data="courses" :columns="columns"></b-table>
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'course',
  computed: {
    ...mapGetters('courses', { findcoursesInStore: 'find' }),
    courses () {
      const courses = this.findcoursesInStore({
        query: {
          $sort: {createdAt: -1}
        }
      })
      return courses && courses.data ? courses.data : []
    }
  },
  data() {
    return {
      name: null,
      time: null,
      cost: null,
      from: null,
      to: null,
      capacity: null,
      errors: {},
      columns: [
        {
            field: 'id',
            label: 'ID'
        },
        {
            field: 'name',
            label: 'courses name',
        },
        {
            field: 'time',
            label: 'time',
        },
        {
            field: 'capacity',
            label: 'capacity',
        },
        {
            field: 'cost',
            label: 'cost',
        },
        {
            field: 'from',
            label: 'from',
        },
        {
            field: 'to',
            label: 'to',
        }
      ]
    }
  },
  methods: {
    ...mapActions('courses', { findcourses: 'find' }),
    ...mapActions('courses', { createcourses: 'create' }),
    save() {
      if (this.validateForm()) {
        this.createcourses({
          name: this.name,
          time: this.time,
          cost: this.cost,
          from: this.from,
          to: this.to,
          capacity: this.capacity
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
        this.errors['name'] = 'courses name is required'
      }
      if (!this.time) {
        this.errors['time'] = 'courses time is required'
      }
      if (!this.cost) {
        this.errors['cost'] = 'courses cost is required'
      }
      if (!this.from) {
        this.errors['from'] = 'courses from is required'
      }
      if (!this.to) {
        this.errors['to'] = 'courses to is required'
      }
      if (!this.capacity) {
        this.errors['capacity'] = 'courses capacity is required'
      }
      return Object.keys(this.errors).length === 0
    }
  },
  created() {
    this.findcourses().catch(error => console.log(error))
  }
}
</script>
