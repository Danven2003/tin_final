<template>
  <div class="pagination-container">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button
            class="page-link"
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
        >
          &lt;  {{$t('paginationPage.previous') }}
        </button>
      </li>
      <li v-for="item in paginationItems" :key="item.key" :class="item.class">
        <button
            v-if="item.type === 'page'"
            class="page-link"
            :class="{ active: currentPage === item.page }"
            @click="goToPage(item.page)"
        >
          {{ item.page }}
        </button>
        <span v-else class="ellipsis">...</span>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === pages }">
        <button
            class="page-link"
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === pages"
        >
          {{$t('paginationPage.next') }} &gt;
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { range } from "@/helpers/utils";

export default {
  name: "McvPagination",
  props: {
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.total / this.limit);
    },
    paginationItems() {
      const maxVisiblePages = 5;
      const buffer = Math.floor((maxVisiblePages - 1) / 2);

      let items = [];

      if (this.pages < 6) {
        items = range(1, this.pages).map(page => ({type: 'page', page}));
      } else {
        if (this.currentPage > 2) {
          items.push({type: 'page', page: 1});
          if (this.currentPage > 3) {
            items.push({type: 'ellipsis'});
          }
        }

        const pageCutLow = Math.max(1, this.currentPage - buffer);
        const pageCutHigh = Math.min(this.pages, this.currentPage + buffer);

        for (let p = pageCutLow; p <= pageCutHigh; p++) {
          items.push({ type: 'page', page: p });
        }

        if (this.currentPage < this.pages - 1) {
          if (this.currentPage < this.pages - 2) {
            items.push({ type: 'ellipsis' });
          }
          items.push({ type: 'page', page: this.pages });
        }
      }

      return items;
    },
  },
  methods: {
    goToPage(page) {
      this.$router.push({ path: this.url, query: { page } });
    },
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}

.pagination {
  list-style: none;
  display: flex;
  gap: 10px;
}

.page-item {
  min-width: 40px;
}

.page-link {
  background-color: #4a4a4a;
  color: #FFA500;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid #525252;
  border-radius: 5px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.page-link:hover {
  background-color: #525252;
}

.active {
  background-color: #007bff;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.ellipsis {
  font-weight: bold;
  margin: 0 5px;
  color: #FFA500;
  font-size: 16px;
}
</style>