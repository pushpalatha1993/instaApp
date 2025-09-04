1.what is an object in js

In js object is a datastructure used store the kay, value pairs. it's allow to group of related properties.

2. How do you create an object in JavaScript?

you can create an object in js severakl aways based on the dependecy you need

  1. Object literal.
  2.using new Object.
  3.using function constructor.
  4.using class Es6+syntax.
  5.using object.create()

  
3. What are the two ways to access object properties?
  1.Dot notation 
  2.Bracket natation  

4. How do you delete a property from an object?
  you delete a property from an object using delete operator.

5.How do you merge two objects?
  here merging two objects by several ways
  1.using spread operator.
  2.using object.assign().
  3.manual merging.
  4.deep merging.

6.What is the `in` operator?
  the in operator used check if property exists in an object.

7.What does `Object.keys()` return
object.keys() return an array of given object own emurable property names.

8.What does `Object.values()` return?
  object.values() return an array  values of an Object own emurable property.

9.What does `Object.entries()` do?  
Object.entries() returns an array of key,value pairs of an object.

10.How do you freeze an object.
we can freeze an object using object.freeze()
it's prevents adding ,removing and updating the existing property.



class compo life cycle in react

3 phases

1.mounting.
2.Update.
3.Unmoutimg

Mounting phase:
static getDerivedStateFreomProps(props,state):

asyn state with props before rendering.
return an object to Update or null to do nothing.

ex: static getDerivedStatefromProps(props, state){
  if(props.reset){
    return(image:'null',caption:'')
  }
  return null;
}

componentDidMount():

called once immeditly after the component mount.
fetch data,add event listeners,start time

ex: componentDidMount() {
  console.log("componentDidMount")
  fetch('/api/user,post')
  .then(res => res.json())
  .then(data => console.log(data))

}
Update phase.

shouldComponentUpdate(nextProps, nextState)

decided to re-render or not.
optimize the performance

ex: shouldComponentUpdate(nextProps, nextState) {
 return this.state.caption !== nextState.caption
}

getSnapShotBeforeUpdate(prevProps, prevState).

capcture the data before DOM is update

ex: getSnapShotBeforeUpdate(prevProps, prevState) {
  if(prevstate.caption !== this.state.caption){
    return 'caption changed'
  }
  return null;
}

componentDidUpdate(prevprops, prevstate, snapshot)
called afterupdate flush to Dom.

ex:componentDidUpdate(prevprops, prevstate, snapshot){
  if(snapShot !== caption changed){
    console.log('caption changed:',this.state.caption)
  }
}





