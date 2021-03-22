<template>
  <div
    class="bg-black text-gray-700 p-16 flex flex-col justify-center items-center text-center"
  >
    <h3 class="uppercase text-sm lg:text-lg mb-4">Address</h3>
    <div class="text-xs lg:text-sm mb-8">
      The yelling light<br />
      c/o Christian Poffet<br />
      Oberseenerstrasse 79<br />
      CH-8405 Winterthur
    </div>

    <mailchimp-form class="mb-12" />

    <social class="mb-12" />

    <div class="text-xs lg:text-sm">
      Copyright © 2021 THE YELLING LIGHT. All Rights Reserved. DISCLAIMER /
      Privacy Policy
    </div>
  </div>
</template>

<script>
import MailchimpForm from '~/components/mailchimpForm'
import Social from '~/components/social'
export default {
  components: { Social, MailchimpForm },
}
</script>

<style></style>
