jQueryExpandableList
====================

jQuery list expandable by ajax requests

Example of usage:
    'window.list = new jQueryExpandableAjaxList({
        id: 'expandable-list',

        initUrl: '@Url.Action("GetInitList")',
        refreshUrl: '@Url.Action("GetList")',

        refreshInterval: 5000
    });'
