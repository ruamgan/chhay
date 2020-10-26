(function() {
  const Modal = {
    element: document.getElementById('preview-modal'),
    content: document.getElementById('modal-content'),
    append(node) {
      this.content.append(node);
    },
    open() {
      this.element.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    },
    close() {
      this.element.style.display = 'none';
      document.body.style.overflow = '';
      this.clear();
    },
    clear() {
      while (this.content.firstChild) {
        this.content.removeChild(this.content.lastChild);
      }
    }
  };

  createExpandables();
  createModalCloseEvents();
  createFigureSetControls();

  function createExpandables() {
    const elements = document.getElementsByClassName('expandable');
    for (let element of elements) {
      element.style.cursor = 'pointer';
      if (element) {
        element.onclick = function(e) {
          const isExpansionEvent = e.target.classList.contains('expandable');
          if (!isExpansionEvent) { return; }
  
          const isFigureSet = e.target.classList.contains('overlay');
          const node = isFigureSet ?
            e.target.closest('.figure-set').cloneNode(true) :
            e.target.cloneNode(true);
  
          Modal.append(node);
          Modal.open();
          createFigureSetControls();
        }
      }
    }
  }
  
  function createModalCloseEvents() {
    // When clicking <span> (x)
    document.getElementById('close-modal').onclick = function() {
      Modal.close();
    };
  
    // When clicking anywhere outside of the modal
    window.onclick = function(event) {
      if (event.target == Modal.element) {
        Modal.close();
      }
    }
  
    // When pressing the Esc key
    window.addEventListener('keydown', function(e) {
      if (e.key == 'Escape' || e.key == 'Esc') {
        Modal.close();
      }
    });
  }
  
  function createFigureSetControls() {
    const controls = document.getElementsByClassName('control');
    for (let control of controls) {
      control.style.cursor = 'pointer';
      control.style.visibility = 'visible';
      if (control.tagName == 'DIV') {
        control.addEventListener('click', changeSlide);
      }
    }
  }
  
  function changeSlide(e) {
    const isSlideControlEvent = e.target.classList.contains('control');
    if (!isSlideControlEvent) { return; }
  
    const figures = e.target.closest('.figure-set').getElementsByClassName('figures')[0];
    const direction = e.target.classList.contains('right') ? 'next' : 'previous';
    switch (direction) {
      case 'next':
        figures.appendChild(figures.children[0]);
        break;
      case 'previous':
        figures.insertBefore(figures.children[figures.children.length - 1], figures.children[0]);
        break;
    }
  }
})();