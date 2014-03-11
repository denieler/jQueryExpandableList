jQueryExpandableList
====================

jQuery list expandable by ajax requests

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
[Demo page](http://demo)
