import { File, Folder, Tree } from "@/components/magicui/file-tree";

export function FileTree() {
  return (
    <div className="relative flex h-[600px] w-full max-w-3xl mx-auto flex-col items-center justify-center overflow-hidden rounded-lg border ">
      <Tree
        className="overflow-hidden rounded-md p-2 border border-black"
        initialSelectedId="1"
        initialExpandedItems={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
        ]}
        elements={ELEMENTS}
        style={{
          color: "white",
        }}
      >
        <Folder value="1" element="src">
          <Folder value="2" element="app">
            <Folder value="3" element="(marketing)">
              <File value="4">
                <p>page.tsx</p>
              </File>
              <File value="5">
                <p>layout.tsx</p>
              </File>
            </Folder>
            <Folder value="6" element="(dashboard)">
              <Folder value="7" element="@components">
                <File value="8">
                  <p>Sidebar.tsx</p>
                </File>
                <File value="9">
                  <p>Navbar.tsx</p>
                </File>
              </Folder>
              <File value="10">
                <p>layout.tsx</p>
              </File>
              <Folder value="11" element="settings">
                <File value="12">
                  <p>page.tsx</p>
                </File>
              </Folder>
              <Folder value="13" element="users">
                <Folder value="14" element="[userId]">
                  <File value="15">
                    <p>page.tsx</p>
                  </File>
                  <File value="16">
                    <p>loading.tsx</p>
                  </File>
                  <File value="17">
                    <p>error.tsx</p>
                  </File>
                </Folder>
              </Folder>
            </Folder>
            <Folder value="18" element="api">
              <Folder value="19" element="auth">
                <File value="20">
                  <p>login.ts</p>
                </File>
                <File value="21">
                  <p>register.ts</p>
                </File>
              </Folder>
              <Folder value="22" element="users">
                <File value="23">
                  <p>route.ts</p>
                </File>
              </Folder>
            </Folder>
            <File value="24">
              <p>layout.tsx</p>
            </File>
            <File value="25">
              <p>page.tsx</p>
            </File>
            <File value="26">
              <p>globals.css</p>
            </File>
          </Folder>

          <Folder value="27" element="components">
            <Folder value="28" element="ui">
              <File value="29">
                <p>Button.tsx</p>
              </File>
              <File value="30">
                <p>Card.tsx</p>
              </File>
              <File value="31">
                <p>Dialog.tsx</p>
              </File>
            </Folder>
            <Folder value="32" element="shared">
              <File value="33">
                <p>Logo.tsx</p>
              </File>
              <File value="34">
                <p>ThemeToggle.tsx</p>
              </File>
            </Folder>
          </Folder>

          <Folder value="35" element="lib">
            <File value="36">
              <p>auth.ts</p>
            </File>
            <File value="37">
              <p>apiClient.ts</p>
            </File>
            <File value="38">
              <p>utils.ts</p>
            </File>
          </Folder>

          <Folder value="39" element="hooks">
            <File value="40">
              <p>useTheme.ts</p>
            </File>
            <File value="41">
              <p>useAuth.ts</p>
            </File>
          </Folder>

          <Folder value="42" element="context">
            <File value="43">
              <p>ThemeContext.tsx</p>
            </File>
            <File value="44">
              <p>AuthContext.tsx</p>
            </File>
          </Folder>

          <Folder value="45" element="types">
            <File value="46">
              <p>user.ts</p>
            </File>
            <File value="47">
              <p>api.ts</p>
            </File>
          </Folder>

          <File value="48">
            <p>middleware.ts</p>
          </File>
        </Folder>
      </Tree>
    </div>
  );
}

// const ELEMENTS = [
//   {
//     id: "1",
//     isSelectable: true,
//     name: "src",
//     children: [
//       {
//         id: "2",
//         isSelectable: true,
//         name: "app",
//         children: [
//           {
//             id: "3",
//             isSelectable: true,
//             name: "layout.tsx",
//           },
//           {
//             id: "4",
//             isSelectable: true,
//             name: "page.tsx",
//           },
//         ],
//       },
//       {
//         id: "5",
//         isSelectable: true,
//         name: "components",
//         children: [
//           {
//             id: "6",
//             isSelectable: true,
//             name: "header.tsx",
//           },
//           {
//             id: "7",
//             isSelectable: true,
//             name: "footer.tsx",
//           },
//         ],
//       },
//       {
//         id: "8",
//         isSelectable: true,
//         name: "lib",
//         children: [
//           {
//             id: "9",
//             isSelectable: true,
//             name: "utils.ts",
//           },
//         ],
//       },
//     ],
//   },
// ];

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "(marketing)",
            children: [
              { id: "4", isSelectable: true, name: "page.tsx" },
              { id: "5", isSelectable: true, name: "layout.tsx" },
            ],
          },
          {
            id: "6",
            isSelectable: true,
            name: "(dashboard)",
            children: [
              {
                id: "7",
                isSelectable: true,
                name: "@components",
                children: [
                  { id: "8", isSelectable: true, name: "Sidebar.tsx" },
                  { id: "9", isSelectable: true, name: "Navbar.tsx" },
                ],
              },
              { id: "10", isSelectable: true, name: "layout.tsx" },
              {
                id: "11",
                isSelectable: true,
                name: "settings",
                children: [{ id: "12", isSelectable: true, name: "page.tsx" }],
              },
              {
                id: "13",
                isSelectable: true,
                name: "users",
                children: [
                  { id: "14", isSelectable: true, name: "[userId]" },
                  {
                    id: "15",
                    isSelectable: true,
                    name: "[userId]",
                    children: [
                      { id: "16", isSelectable: true, name: "page.tsx" },
                      { id: "17", isSelectable: true, name: "loading.tsx" },
                      { id: "18", isSelectable: true, name: "error.tsx" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "19",
            isSelectable: true,
            name: "api",
            children: [
              {
                id: "20",
                isSelectable: true,
                name: "auth",
                children: [
                  { id: "21", isSelectable: true, name: "login.ts" },
                  { id: "22", isSelectable: true, name: "register.ts" },
                ],
              },
              {
                id: "23",
                isSelectable: true,
                name: "users",
                children: [{ id: "24", isSelectable: true, name: "route.ts" }],
              },
            ],
          },
          { id: "25", isSelectable: true, name: "globals.css" },
          { id: "26", isSelectable: true, name: "layout.tsx" },
          { id: "27", isSelectable: true, name: "page.tsx" },
        ],
      },
      {
        id: "28",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "29",
            isSelectable: true,
            name: "ui",
            children: [
              { id: "30", isSelectable: true, name: "Button.tsx" },
              { id: "31", isSelectable: true, name: "Card.tsx" },
              { id: "32", isSelectable: true, name: "Dialog.tsx" },
            ],
          },
          {
            id: "33",
            isSelectable: true,
            name: "shared",
            children: [
              { id: "34", isSelectable: true, name: "Logo.tsx" },
              { id: "35", isSelectable: true, name: "ThemeToggle.tsx" },
            ],
          },
        ],
      },
      {
        id: "36",
        isSelectable: true,
        name: "lib",
        children: [
          { id: "37", isSelectable: true, name: "auth.ts" },
          { id: "38", isSelectable: true, name: "apiClient.ts" },
          { id: "39", isSelectable: true, name: "utils.ts" },
        ],
      },
      {
        id: "40",
        isSelectable: true,
        name: "hooks",
        children: [
          { id: "41", isSelectable: true, name: "useTheme.ts" },
          { id: "42", isSelectable: true, name: "useAuth.ts" },
        ],
      },
      {
        id: "43",
        isSelectable: true,
        name: "context",
        children: [
          { id: "44", isSelectable: true, name: "ThemeContext.tsx" },
          { id: "45", isSelectable: true, name: "AuthContext.tsx" },
        ],
      },
      {
        id: "46",
        isSelectable: true,
        name: "types",
        children: [
          { id: "47", isSelectable: true, name: "user.ts" },
          { id: "48", isSelectable: true, name: "api.ts" },
        ],
      },
      {
        id: "49",
        isSelectable: true,
        name: "middleware.ts",
      },
    ],
  },
];
