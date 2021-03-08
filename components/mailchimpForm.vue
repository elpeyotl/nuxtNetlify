<template>
  <div>
    <link
      href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css"
      rel="stylesheet"
      type="text/css"
    />
    <style type="text/css">
      #mc_embed_signup {
        background: black;
        clear: left;
        width: 100%;
      }
      /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
       We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
    </style>
    <div id="mc_embed_signup">
      <form
        id="mc-embedded-subscribe-form"
        action="https://theyellinglight.us20.list-manage.com/subscribe/post?u=38b3b7438198ed35cc2291282&amp;id=d479b6ab03"
        method="post"
        name="mc-embedded-subscribe-form"
        class="validate"
        target="_blank"
        novalidate
      >
        <div id="mc_embed_signup_scroll">
          <label for="mce-EMAIL">
            <h3 class="uppercase text-sm lg:text-sm font-light">
              Newsletter
            </h3></label
          >
          <div class="flex flex-col">
            <input
              id="mce-EMAIL"
              type="email"
              value=""
              name="EMAIL"
              class="email"
              placeholder="email address"
              required
            />
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: absolute; left: -5000px" aria-hidden="true">
              <input
                type="text"
                name="b_38b3b7438198ed35cc2291282_d479b6ab03"
                tabindex="-1"
                value=""
              />
            </div>
            <div class="clear mt-4">
              <input
                id="mc-embedded-subscribe"
                type="submit"
                value="Subscribe"
                name="subscribe"
                class="button"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MailchimpForm',
}
</script>

<style scoped>
.email {
  @apply bg-gray-200 !important;
}
</style>
