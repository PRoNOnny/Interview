
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, term?: any, searchBy?: any, sort?: any): any {

    if (term == undefined || term == null || term == '') {
      return value;
    }

    if (value?.data != null || value?.data != undefined) {
      value = value.data
    }

    if (Array.isArray(value[0])) {
      return SearchPipe.arrayFilter(value, term, sort)
    }

    if (searchBy == undefined) {
      return SearchPipe.searchAll(value, searchBy, term, sort)
    } else {
      return typeof searchBy == 'string' ?
        SearchPipe.stringFilter(value, searchBy, term, sort) :
        SearchPipe.objectFilter(value, searchBy, term, sort)
    }
  }

  static searchAll(arr: any, property: any, search: any, sort?: any) {
    let result = []

    result = arr.filter((i: any) =>
      Object.values(i)?.find((v: any) =>
        v?.toString().toLowerCase().includes(search.toLowerCase())
      )
    )

    return this.sort(result, property, search, sort)
  }

  static arrayFilter(arr: any, search: any, sort?: any) {
    let result = []

    result = arr.filter((i: any) =>
      i?.toLowerCase().includes(search.toLowerCase())
    )

    return this.sort(result, undefined, search, sort)
  }

  static objectFilter(arr: any, property: any, search: any, sort?: any) {
    let result: any = []
    let count = 0

    const cons: any = (i: any,j:any) => {
      let xx: any = []

      if (Array.isArray(i)) {
        xx = [...i]
      } else {
        for (const key in i) {
          Array.isArray(i[key]) ? xx = [...xx, ...i[key]] : ''
        }
      }

      if (i.hasOwnProperty(j)) {
        return i[j]?.toString().toLowerCase().includes(search?.toLowerCase())
      } else if (xx.length > 0) {
        return xx.filter((x: any) => cons(x,j) == true).length > 0
      } else {
        return false
      }
    }

    while (count < property.length) {
      result = [...result, ...arr.filter((i: any) => {
        return i.hasOwnProperty(property[count]) ? i[property[count]]?.toString().toLowerCase().includes(search?.toLowerCase()) : cons(i,property[count])
      })]
      count++
    }

    return this.sort(result, property[0], search, sort)
  }

  static stringFilter(arr: any, property: any, search: any, sort?: any) {
    let result: any = []
    let temp:any 

    const cons: any = (i: any) => {
      let xx: any = []

      if (Array.isArray(i)) {
        xx = [...i]
      } else {
        for (const key in i) {
          Array.isArray(i[key]) ? xx = [...xx, ...i[key]] : ''
        }
      }

      if (i.hasOwnProperty(property)) {
        return i[property]?.toString().toLowerCase().includes(search?.toLowerCase())
      } else if (xx.length > 0) {
        return xx.filter((x: any) => cons(x) == true).length > 0
      } else {
        return false
      }
    }

    result = [...result, ...arr.filter((i: any) => {
      return i.hasOwnProperty(property) ? i[property]?.toString().toLowerCase().includes(search?.toLowerCase()) : cons(i)
    })]

    return this.sort(result, property, search, sort)
  }

  static sort(arr: any, property: any, search: any, sort?: any) {

    if (sort == 'alphabet') {
      return arr.sort((a: any, b: any) => {

        if (property != undefined) {
          a = a[property]
          b = b[property]
        }

        if (a?.toString().toLowerCase() == null) {
          return -1
        } else if (b?.toString().toLowerCase() == null) {
          return 1
        } else if (a?.toString().toLowerCase() > b?.toString().toLowerCase()) {
          return 1
        } else if (a?.toString().toLowerCase() < b?.toString().toLowerCase()) {
          return -1
        } else {
          return 0
        }
      })
    } else {

      return arr.sort((a: any, b: any) => {
        if (property != undefined) {
          a = a[property]
          b = b[property]
        }

        return a?.toString().toLowerCase().indexOf(search) - b?.toString().toLowerCase().indexOf(search);
      })
    }
  }
}