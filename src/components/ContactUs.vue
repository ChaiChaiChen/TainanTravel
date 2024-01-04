<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="col-12 mt-5 background-image">
    <div class="container align-item-center">
      <div class="row justify-content-center">
        <Form class="col-xl-6 col-sm-8 col-10 contactUs mt-5 text-white">
          <div class="mb-3 mt-3">
            <label for="exampleFormControlInput1" class="form-label">姓名</label>
            <input type="text" class="form-control" id="exampleFormControlInputName" />
          </div>
          <div class="mb-3 mt-3">
            <label for="exampleFormControlInput1" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInputEmail"
              placeholder="請輸入Email"
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="exampleFormControlTextarea1" class="form-label">留言</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
          </div>
          <div class="mb-3 mt-3 text-end">
            <button type="button" class="btn btn-primary btn-lg">送出</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.background-image {
  max-width: 100%;
  height: 500px;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(https://images.unsplash.com/photo-1549817778-71fd33ffb580?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
}
.contactUs {
  backdrop-filter: blur(15px);
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
}
</style>
