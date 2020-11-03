class MyPromise {

  constructor( callback ) {
    this.onCatch = null;
    this.onFinally = null;
    this.callbackList = [];
    this.isRejected = false;

    function resolver( data ) {
      if ( this.isRejected ) {
        return;
      }

      this.callbackList.forEach( cb => {
        data = cb( data );
      } )

      this.onFinally && this.onFinally();
    }

    function rejector( error ) {
      this.isRejected = true;
      this.onCatch && this.onCatch( error );
      this.onFinally && this.onFinally();
    }

    callback( resolver.bind( this ), rejector.bind( this ) )
  }

  thenMy( callback ) {
    this.callbackList.push( callback );
    return this;
  };

  catchMy( callback ) {
    this.onCatch = callback;
    return this;
  };

  finallyMy( callback ) {
    this.onFinally = callback;
    return this;
  };

}
