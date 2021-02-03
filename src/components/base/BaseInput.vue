<template>
  <div class="base-input">
    <label
      v-if="label"
      :for="id"
      class="base-input__label"
    >
      {{ label }}
    </label>

    <div class="base-input__inner">
      <input
        :id="id"
        :value="modelValue"
        :class="{ 'is-error': internalError }"
        class="base-input__input"
        type="text"
        v-bind="$attrs"
        @input="onInput"
      />

      <slot name="postfix"></slot>
    </div>

    <div v-if="errorMessage && internalError" class="base-input__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed, ref, watchEffect, SetupContext,
} from 'vue';

type TBaseInputProps = {
  label: string;
  hasError: boolean;
  errorMessage: string;
}

export default defineComponent({
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  setup(props: TBaseInputProps, ctx: SetupContext) {
    const internalError = ref(false);

    const id = computed(() => {
      if (props.label) {
        return props.label.replaceAll(' ', '');
      }

      return '';
    });

    const onInput = (e: { target: HTMLInputElement }) => {
      internalError.value = false;
      ctx.emit('update:modelValue', e.target.value);
    };

    watchEffect(() => {
      internalError.value = Boolean(props.errorMessage || props.hasError);
    });

    return {
      id,
      internalError,
      onInput,
    };
  },
});
</script>

<style lang="scss">
.base-input {
  &__label {
    display: block;
    margin-bottom: 7px;
    font-size: 13px;
    font-weight: bold;
  }

  &__inner {
    display: flex;
    align-items: center;
  }

  &__input {
    box-sizing: border-box;
    height: 40px;
    padding: 7px 14px 9px;
    border: 1px solid #ccc;
    outline: none;
    transition: 0.4s;

    &:focus {
      border-color: lightblue;
    }

    &.is-error {
      border-color: $color-red;
    }
  }

  &__error {
    margin-top: 5px;
    font-size: 13px;
    color: $color-red;
  }
}
</style>
