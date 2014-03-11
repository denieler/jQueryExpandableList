jQueryExpandableList
====================

jQuery list expandable by ajax requests. The list is expanding only appears or disappears list items that are loaded by interval from the url service.

Example of usage:
```javascript
$(document).ready(function(){
    var expandableList = new jQueryExpandableAjaxList({
        id: 'expandable-list',
        initUrl: 'http://example.com/initUrl',
        refreshUrl: 'http://example.com/refreshUrl',
        refreshInterval: 5000
    });
});
```

HTML:
```html
<ul id='expandable-list'>
</ul>
```

#Documentation
[Documentation](https://github.com/DENIELER/jQueryExpandableList/wiki/Documentation)

#Demo
[Demo page](http://devcodereview.ru/jqueryExpandableAjaxList/jquery-expandable-ajax-list-example.html)
