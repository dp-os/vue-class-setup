import { getCurrentInstance as get, version } from 'vue';

export const isVue2 = /^2\./.test(version);
export const isVue3 = /^3\./.test(version);

export function getCurrentInstance(): VueInstance | null {
    const vm = get();
    if (vm && vm.proxy) {
        return vm.proxy as VueInstance;
    }
    return null;
}

type Instance = NonNullable<NonNullable<ReturnType<typeof get>>['proxy']>;

type VueModule = typeof import('vue');
type Vue = VueModule extends { default: unknown }
    ? VueModule['default']
    : never;

export type VueInstance = Vue extends never ? Instance : InstanceType<Vue>;
