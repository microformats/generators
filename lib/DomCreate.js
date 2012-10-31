/*

=head1 NAME

DOM.Element.Create - Create new DOM elments in a more declarative manner

=head1 SYNOPSIS

  // BEFORE 
    var link = document.createElement('a');
        link.href=    "http://www.google.com";
        link.title=   "Search the Web";
        link.target=  "_blank"
        link.onclick= function() { alert('here we go'); return true; };
        link.appendChild( document.createTextNode('link to Google') );
    var para = document.createElement('p');
        para.id        = 'foo';
        para.style.fontWeight = 'bold';
        para.style.border = '1px solid black';
        para.className = 'body-text';
        para.onmouseover = function(){ this.style.backgroundColor="red";   };
        para.onmouseout  = function(){ this.style.backgroundColor="white"; };
        para.appendChild( document.createTextNode('here is a ') );
        para.appendChild( link );

  // AFTER
    var para = createElement( 'p', {
        id:        'foo',
        className: 'body-text',
        style:     {
            fontWeight: 'bold',
            border: '1px solid black'
        },
        events:    {
            mouseover: function(){ this.style.backgroundColor="red";   },
            mouseout:  function(){ this.style.backgroundColor="white"; }
        },
        childNodes: [  'here is a ',

            createElement( 'a', {
                href:      'http://www.google.com',
                className: 'offsite',
                title:     'Search the Web',
                target:    '_blank',
                events:    {
                    click: function() { alert('here we go'); return true; }
                },
                childNodes: [ 'link to Google' ]
            })
        ]
    });

=head1 DESCRIPTION

It has been fairly common in code I've had to write to create one or more html elements
and subsequently set many of their attributes, append children and register event listeners.
Rather than write line after line of C<element.property='foo'> and
C<element.onevent=function(){}>, C<DOM.Element.Create> allows a more declarative approach to
defining new elements.

C<DOM.Element.Create> does not export any methods by default, but allows you to export either of the
methods described below.

=head2 Package Methods

=cut

*/

if ( typeof DOM == "undefined") DOM = {};
if ( typeof DOM.Element == "undefined") DOM.Element = {};

DOM.Element.Create = {

    VERSION: 0.01,

    EXPORT_OK: [ 'createElement','updateElement' ],

/*

=head3 C<createElement(  'tagName', {attributes}  ) >

Pass a tagName and an associative array of attributes to this method and get back the
correpsonding element.  attribute names are not checked for validity, allowing the possibility
of adding custom attributes to an element.  There are, however, 3 reserved keys:

=over

=item C<style>

Javascript typically manipulates style information in the form C<element.style.property='value'>.
The C<style> key in the attribute list is expected to point to an associative array of javascript-compatible
style properties.

=item C<events>

The C<events> key points to an associative array of eventlisteners.  The keys are expected to take the form
of 'click','mouseover' and the like, rather than 'onclick', 'onmouseover', etc.

=item C<childNodes>

This is an array of elements to be appended to the element being created.  Plain strings can be passed in as
well and will be turned into text nodes.

=back

=cut

*/

    createElement: function(tagName,attributes) {
        if( !tagName ) return null;
        var element = document.createElement(tagName);
        if( !element ) return null;

        return DOM.Element.Create.updateElement(element,attributes)
    },

/*

=head3 C<updateElement( element, {attributes} )>

This function applies the same attributes associative array described under C<createElement> to an already
existing element, C<element>.

=cut

*/

    updateElement: function(element,attributes) {
        if( !element ) return null;

        for( var attr in attributes ) {
            switch(attr) {
            case 'style':
                for( var property in attributes[attr] ) 
                    element.style[property] = attributes[attr][property];
                break;

            case 'events':
                for( var event in attributes[attr] ) 
                    addListener(element, event, attributes[attr][event] );
                break;

            case 'childNodes':
                for( var i = 0; i < attributes[attr].length; i++ ) {
                    var child = attributes[attr][i];

                    if( child ) {
                        if( typeof child == 'string' )
                            child = document.createTextNode( child );

                        element.appendChild( child );
                    }
                }
                break;

            default:
                element.setAttribute(attr,attributes[attr]);
            }
        }

        return element;
    }

}
/*

=head1 AUTHOR

Stephen Howard, <stephen@enterity.com>.

=head1 COPYRIGHT

  Copyright (c) 2005 Stephen Howard.  All rights reserved.
  This module is free software; you can redistribute it and/or modify it
  under the terms of the Artistic license.

=cut

*/

