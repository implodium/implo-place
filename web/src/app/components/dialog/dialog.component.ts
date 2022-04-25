import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, timeout} from "rxjs";
import {elementEventFullName} from "@angular/compiler/src/view_compiler/view_compiler";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit {

  @Input()
  animationSpeedInSeconds = 0.2

  @ViewChild('dialog')
  dialog!: ElementRef

  @ViewChild('dialogContainer')
  private dialogContainer!: ElementRef

  private dialogDiv!: HTMLDivElement

  private dialogContainerDiv!: HTMLDivElement

  private isOpen: boolean = false;

  private readonly milliToSecondsConstant = 1000

  constructor() { }

  ngAfterViewInit(): void {
    [this.dialogDiv, this.dialogContainerDiv] = this.divReferences
  }

  private get divReferences() {
    return [this.dialog, this.dialogContainer]
      .map(ref => ref.nativeElement as HTMLDivElement)
  }

  async open() {
    this.isOpen = true
    await this.openAnimation()
  }


  private async openAnimation() {
    this.setContainerDisplayFlex()
    this.addClassesInAnimationFrame()
    await this.animationDuration()
  }

  private setContainerDisplayFlex() {
    this.dialogContainerDiv.style.display = 'flex'
  }

  private addClassesInAnimationFrame() {
    requestAnimationFrame(() => {
      this.dialogContainerDiv.classList.add('dialog-container-open')
      this.dialogDiv.classList.add('dialog-open')
    })
  }

  private async animationDuration() {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
      }, this.animationSpeedInSeconds * this.milliToSecondsConstant)
    })
  }

  async close() {
    this.isOpen = false
    await this.closeAnimation()
  }

  async backgroundClose(event: Event) {
    event.stopImmediatePropagation()
    this.isOpen = false
    await this.closeAnimation()
  }

  private async closeAnimation() {
    this.removeOpenClasses()
    await this.setDisplayNoneAfterTimeOut()
  }

  private removeOpenClasses() {
    this.dialogContainerDiv.classList.remove('dialog-container-open')
    this.dialogDiv.classList.remove('dialog-open')
  }

  private setDisplayNoneAfterTimeOut() {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        this.dialogContainerDiv.style.display = 'none'
        resolve();
      }, this.animationSpeedInSeconds * this.milliToSecondsConstant)
    })
  }

}
