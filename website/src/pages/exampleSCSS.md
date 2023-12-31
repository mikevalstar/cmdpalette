```scss
.palette1 {
  padding: 0;
  border: 1px solid #ccc;
  width: 500px;
  max-width: 100%;
  border-radius: 5px;

  header {
    border-bottom: 1px solid #ccc;

    input {
      width: 100%;
      padding: 0.75rem;
      font-size: 1.25rem;
      border: 0;

      &:focus {
        outline: none;
      }
    }
  }
  main {
    section {
      padding: 0.5em 0;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          display: flex;
          justify-content: space-between;
          padding: 0.5em 1em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          align-items: baseline;

          &:global(.selected) {
            background-color: rgba(0, 0, 255, 0.1);
          }

          span:first-child {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          span + span {
            flex: 2;
            padding-left: 1em;
            color: #777;
            font-size: 0.8rem;
            font-style: italic;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          abbr {
            width: 1em;
            padding-left: 1em;
          }
        }
      }
    }
  }
  footer {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-top: 1px solid #ccc;
    background: #eee;
    font-size: 0.9rem;

    div {
      width: 33%;
      text-align: center;

      em {
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        background: #777;
        color: white;
        font-size: 0.6rem;
      }
    }
  }
}

.palette1::backdrop {
  background-color: rgba(0, 0, 0, 0.4);
}
```
