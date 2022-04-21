import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input()
  animationSpeedInSeconds = 0.2

  @ViewChild('dialog')
  dialog!: ElementRef

  @ViewChild('dialogContainer')
  dialogContainer!: ElementRef

  isOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  open() {
    this.isOpen = true
    const [divDialog, dialogContainerDiv] = this.divReferences

    dialogContainerDiv.style.display = 'flex'
    requestAnimationFrame(() => {
      dialogContainerDiv.classList.add('dialog-container-open')
      divDialog.classList.add('dialog-open')
    })
  }

  private get divReferences() {
    return [this.dialog, this.dialogContainer]
      .map(ref => ref.nativeElement as HTMLDivElement)
  }

  close() {
    this.isOpen = false
    const [divDialog, dialogContainerDiv] = this.divReferences

    dialogContainerDiv.classList.remove('dialog-container-open')
    divDialog.classList.remove('dialog-open')

    setTimeout(() => {
      requestAnimationFrame(() => {
        dialogContainerDiv.style.display = 'none'
      })
    }, this.animationSpeedInSeconds * 1000)
  }

}
