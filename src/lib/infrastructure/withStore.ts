import { BlockClass, Store } from '../../core';

type WithStateProps = { store: Store<AppState> }; // eslint-disable-line no-undef

export function withStore<P extends WithStateProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = () => {
      console.log('__onChangeStoreCallback', WrappedBlock.componentName)
      //@ts-ignore
      this.setProps({ ...this.props, store: window.store });
    }

    componentDidMount(props: P) {
      super.componentDidMount(props);
      console.log('componentDidMount', WrappedBlock.componentName)
      window.store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      console.log('componentWillUnmount', WrappedBlock.componentName)
      window.store.off('changed', this.__onChangeStoreCallback);
    }

  } as BlockClass<Omit<P, 'store'>>;
}
