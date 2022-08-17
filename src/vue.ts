import { getCurrentInstance as get, version } from 'vue';

export const isVue2 = /^2\./.test(version);
export const isVue3 = /^3\./.test(version);

export function getCurrentInstance() {
    const vm = get();
    return vm && vm.proxy;
}

export type VueInstance = NonNullable<ReturnType<typeof getCurrentInstance>>;
